import AppError from '@common/errors/app-error';
import UserPasswordResetTokenValidationService from '@modules/access/services/user/UserPasswordResetTokenValidationService';
import { container, inject, injectable } from 'tsyringe';
import UserRepository from '../../repositories/UserRepository';
import UserHelper from '../../UserHelper';

export interface UserPasswordResetDTO {
  userId: string;
  password: string;
  passwordConfirmation: string;
  passwordResetToken: string;
}

@injectable()
class UserPasswordResetService {

  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository) {
  }

  public async execute(userPasswordResetDTO: UserPasswordResetDTO): Promise<number | undefined> {

    const { password, passwordConfirmation, userId, passwordResetToken } = userPasswordResetDTO;
    let resetResult: number | undefined;

    const tokenValidationService = container.resolve(UserPasswordResetTokenValidationService);
    tokenValidationService.execute({ token: passwordResetToken });

    if (password) {

      if (password !== passwordConfirmation) {

        throw new AppError('Password and password confirmation do not match.', 500);
      }
    }

    const cryptPassword = await UserHelper.encryptPassword(password);
    resetResult = await this.userRepository.updatePassword(cryptPassword, userId);

    if (resetResult === 1) {
      resetResult = await this.userRepository.updateToken(undefined, userId);
    }

    return resetResult;
  }
}

export default UserPasswordResetService;