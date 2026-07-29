import { Request } from 'express';
import { KeyTokenDocument } from './entities/key-token.entity';

export const REFRESH_TOKEN_HEADER = 'x-refresh-token';
export const ACCESS_TOKEN_HEADER = 'authorization';

export interface AuthJwtPayload {
  userId: string;
  email: string;
  roles: string[];
}

export interface AuthenticatedRequest extends Request {
  keyStore: KeyTokenDocument;
  user: AuthJwtPayload;
  refreshToken?: string;
}
