import { Router } from 'express';
import UserPasswordResetController from '../controller/UserPasswordResetController';

const userPasswordResetRoute = Router();
const userPasswordResetController = new UserPasswordResetController();

userPasswordResetRoute.post( '/request-reset-password', userPasswordResetController.requestPasswordReset );
userPasswordResetRoute.post( '/validate-reset-token', userPasswordResetController.validateResetToken );
userPasswordResetRoute.post( '/password-reset', userPasswordResetController.passwordReset );

export default userPasswordResetRoute;