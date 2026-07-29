import { IsString } from 'class-validator';

export class GoogleSignInDto {
  @IsString()
  accessToken!: string;
}
