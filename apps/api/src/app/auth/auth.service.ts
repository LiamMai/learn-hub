import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { KeyToken, KeyTokenDocument } from './entities/key-token.entity';
import { User, UserDocument } from './entities/user.entity';
import { parseObjectId } from '../utils/parse-object-id';

interface GoogleUserInfo {
  sub: string;
  email: string;
  name: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  roles: string[];
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(KeyToken.name)
    private readonly keyTokenModel: Model<KeyTokenDocument>,
    private readonly configService: ConfigService,
  ) {}

  private generateKeyPair() {
    return crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
    });
  }

  private createTokenPair(
    payload: JwtPayload,
    publicKey: string,
    privateKey: string,
  ): TokenPair {
    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: process.env.ACCESS_TOKEN_EXPIRED || '2d',
    } as jwt.SignOptions);

    const refreshToken = jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: process.env.REFRESH_TOKEN_EXPIRED || '7d',
    } as jwt.SignOptions);

    return { accessToken, refreshToken };
  }

  private pickUser(user: UserDocument) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    };
  }

  private async issueSession(user: UserDocument) {
    const { publicKey, privateKey } = this.generateKeyPair();
    const tokens = this.createTokenPair(
      { userId: user._id.toString(), email: user.email, roles: user.roles },
      publicKey,
      privateKey,
    );

    await this.keyTokenModel.findOneAndUpdate(
      { user: user._id },
      { publicKey, privateKey, refreshToken: tokens.refreshToken, refreshTokenUsed: [] },
      { upsert: true },
    );

    return { user: this.pickUser(user), ...tokens };
  }

  async signUp(dto: SignUpDto) {
    const existing = await this.userModel.findOne({ email: dto.email });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({
      name: dto.name,
      email: dto.email,
      password: passwordHash,
    });

    const { publicKey, privateKey } = this.generateKeyPair();
    const tokens = this.createTokenPair(
      { userId: user._id.toString(), email: user.email, roles: user.roles },
      publicKey,
      privateKey,
    );

    await this.keyTokenModel.create({
      user: user._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    return { user: this.pickUser(user), ...tokens };
  }

  async login(dto: SignInDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user?.password) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    return this.issueSession(user);
  }

  async loginWithGoogle(accessToken: string) {
    let profile: GoogleUserInfo;
    try {
      const response = await axios.get<GoogleUserInfo>(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      profile = response.data;
    } catch {
      throw new UnauthorizedException('Invalid Google access token');
    }

    let user = await this.userModel.findOne({ email: profile.email });
    if (!user) {
      user = await this.userModel.create({
        name: profile.name,
        email: profile.email,
        provider: 'google',
        googleId: profile.sub,
      });
    } else if (!user.googleId) {
      user.googleId = profile.sub;
      await user.save();
    }

    return this.issueSession(user);
  }

  getGoogleClientId() {
    return this.configService.get<string>('GOOGLE_CLIENT_ID');
  }

  async refreshToken(userId: string, refreshToken: string) {
    const keyStore = await this.keyTokenModel.findOne({
      user: parseObjectId(userId),
    });
    if (!keyStore) {
      throw new UnauthorizedException('Not found key store');
    }

    if (keyStore.refreshTokenUsed.includes(refreshToken)) {
      await keyStore.deleteOne();
      throw new UnauthorizedException(
        'Something went wrong. Please login again',
      );
    }

    if (keyStore.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const decoded = jwt.verify(refreshToken, keyStore.publicKey) as JwtPayload;
    if (decoded.userId !== userId) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = this.createTokenPair(
      { userId: decoded.userId, email: decoded.email, roles: decoded.roles },
      keyStore.publicKey,
      keyStore.privateKey,
    );

    await this.keyTokenModel.updateOne(
      { user: parseObjectId(userId) },
      {
        $set: { refreshToken: tokens.refreshToken },
        $addToSet: { refreshTokenUsed: refreshToken },
      },
    );

    return tokens;
  }

  async logout(userId: string) {
    await this.keyTokenModel.deleteOne({ user: parseObjectId(userId) });
    return null;
  }
}
