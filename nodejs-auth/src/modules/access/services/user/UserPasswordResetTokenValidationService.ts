import LoadUserService from "@modules/actor/services/User/LoadUserService";
import { container, injectable } from "tsyringe";
import AppError from "@common/errors/app-error";
import User from "@modules/actor/model/User";
import UserHelper, { TokenPayload } from "@modules/actor/UserHelper";
import { QueryFailedError } from "typeorm";

export interface UserPasswordResetToken {
	token: string;
}

@injectable()
class UserPasswordResetTokenValidationService {

	private loadUserService: LoadUserService;

	constructor() {

		this.loadUserService = container.resolve(LoadUserService);
	}

	public async execute(userPasswordResetToken: UserPasswordResetToken): Promise<User | undefined> {
    
    
    try {

			const { token } = userPasswordResetToken;
      let decoded;

      try {

        decoded = UserHelper.verifyJWToken(token);
      } catch ( err ) {

        throw new AppError('Invalid JWT Token.', 401);
      }

      const { sub } = decoded as TokenPayload;

      const userId = sub;

			const user = await this.loadUserService.findById(userId);

      if ( user ) {

        if ( user.token !== token ) {

          throw new AppError('O link já foi utilizado para redefinir a senha.', 401);
        }
      } else {

        throw new AppError('Link inválido.', 401);
      }

      return user;

    } catch ( err ) {

      let message = '';

      if ( err instanceof QueryFailedError ) {

        message = (err as QueryFailedError).message;
        throw new AppError( message, 500);
      } else {

        throw err;
      }
    }

	}
		
}

export default UserPasswordResetTokenValidationService;