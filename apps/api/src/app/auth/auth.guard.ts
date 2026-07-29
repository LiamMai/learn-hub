import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { KeyToken, KeyTokenDocument } from '../entities/key-token.entity';
import { parseObjectId } from '../utils/parse-object-id';
import {
  ACCESS_TOKEN_HEADER,
  AuthenticatedRequest,
  AuthJwtPayload,
  REFRESH_TOKEN_HEADER,
} from './auth-request';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(KeyToken.name)
    private readonly keyTokenModel: Model<KeyTokenDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const refreshToken = request.headers[REFRESH_TOKEN_HEADER]?.toString();
    const accessToken = this.extractBearerToken(
      request.headers[ACCESS_TOKEN_HEADER]?.toString(),
    );
    const token = refreshToken || accessToken;

    if (!token) {
      throw new UnauthorizedException('Invalid request');
    }

    const unverified = jwt.decode(token) as AuthJwtPayload | null;
    if (!unverified?.userId) {
      throw new UnauthorizedException('Invalid token');
    }

    const keyStore = await this.keyTokenModel.findOne({
      user: parseObjectId(unverified.userId),
    });
    if (!keyStore) {
      throw new NotFoundException('Not found key store');
    }

    const decoded = this.verify(token, keyStore.publicKey);
    request.keyStore = keyStore;
    request.user = decoded;
    if (refreshToken) {
      request.refreshToken = refreshToken;
    }
    return true;
  }

  private extractBearerToken(header?: string): string | undefined {
    if (!header) return undefined;
    return header.startsWith('Bearer ') ? header.slice(7) : header;
  }

  private verify(token: string, publicKey: string): AuthJwtPayload {
    try {
      return jwt.verify(token, publicKey) as AuthJwtPayload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
