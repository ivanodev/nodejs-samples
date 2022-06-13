import 'express-async-errors';
import { Request, Response, NextFunction } from "express"; 
import AppError from '../../../errors/app-error';

const exceptionHandler = (( err: Error, request: Request, response: Response, next: NextFunction ) => {
  if ( err instanceof AppError ) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message:`Internal server error. ${err}`
  });
});

export default exceptionHandler;