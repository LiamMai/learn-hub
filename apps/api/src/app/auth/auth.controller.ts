import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GoogleSignInDto } from './dto/google-sign-in.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { REFRESH_TOKEN_HEADER } from './auth-request';
import type { AuthenticatedRequest } from './auth-request';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Register a new user and issue a token pair' })
  @ApiResponse({ status: 201, description: 'User created, tokens issued' })
  @ApiResponse({ status: 409, description: 'Email already registered' })
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Log in and issue a fresh token pair' })
  @ApiResponse({ status: 201, description: 'Tokens issued' })
  @ApiResponse({ status: 401, description: 'Email or password is incorrect' })
  signIn(@Body() dto: SignInDto) {
    return this.authService.login(dto);
  }

  @Post('google')
  @ApiOperation({ summary: 'Log in (or sign up) with a Google access token' })
  @ApiResponse({ status: 201, description: 'Tokens issued' })
  @ApiResponse({ status: 401, description: 'Invalid Google access token' })
  googleSignIn(@Body() dto: GoogleSignInDto) {
    return this.authService.loginWithGoogle(dto.accessToken);
  }

  @Get('google/client-id')
  @ApiOperation({ summary: 'Get the Google OAuth client id for the frontend' })
  getGoogleClientId() {
    return { clientId: this.authService.getGoogleClientId() };
  }

  @Post('refresh-token')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Rotate the refresh token and issue a new pair' })
  @ApiHeader({ name: REFRESH_TOKEN_HEADER, description: 'Current refresh token' })
  @ApiResponse({ status: 201, description: 'New tokens issued' })
  @ApiResponse({ status: 401, description: 'Invalid or reused refresh token' })
  refreshToken(@Req() request: AuthenticatedRequest) {
    return this.authService.refreshToken(
      request.user.userId,
      request.refreshToken as string,
    );
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Revoke the current session' })
  @ApiResponse({ status: 201, description: 'Session revoked' })
  logout(@Req() request: AuthenticatedRequest) {
    return this.authService.logout(request.keyStore.user.toString());
  }
}
