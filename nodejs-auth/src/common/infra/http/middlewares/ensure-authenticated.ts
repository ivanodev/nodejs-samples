import { Request, Response, NextFunction } from 'express';
import authConfig from '@config/auth';
import { verify } from 'jsonwebtoken';
import AppError from '@common/errors/app-error';
import Session from '@common/infra/server/Session';

interface tokenPayload {
  iat: number;
  exp: number;
  sub: string;
  userName: string;
}

export default function ensureAthenticated(
  request: Request, response: Response, next: NextFunction): void {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Access unauthorized.', 401);
  }

  //Bearer, token
  const [, token] = authHeader.split(' ');

  try {

    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, userName } = decoded as tokenPayload;

    request.user = {
      id: sub,
      name: userName
    }

    Session.user = request.user;

    return next();
  } catch (err) {

    throw new AppError('Invalid JWT Token.', 401);
  }
}