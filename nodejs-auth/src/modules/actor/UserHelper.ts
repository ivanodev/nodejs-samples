import { hash } from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@common/errors/app-error';

export interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

class UserHelper {

  static async encryptPassword( password: string ): Promise<string> {

    try {

      const hashedPassword = await hash( password, 8 );
      return hashedPassword;

    } catch (err) {

      throw new AppError('Error encrypting password.', 500);
    }
  }

  static verifyJWToken(token: string): TokenPayload {

    return verify( token, authConfig.jwt.secret ) as TokenPayload;
  }
}

export default UserHelper;