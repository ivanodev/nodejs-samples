import UserPasswordResetRequestService from "@modules/access/services/user/UserPasswordResetRequestService";
import UserPasswordResetTokenValidationService, { UserPasswordResetToken } from "@modules/access/services/user/UserPasswordResetTokenValidationService";
import UserPasswordResetService, { UserPasswordResetDTO } from "@modules/actor/services/User/UserPasswordResetService";
import { Request, Response } from 'express';
import { container } from "tsyringe";

class UserPasswordResetController {

  public async requestPasswordReset(request: Request, response: Response): Promise<Response> {

		const { email } = request.body;
		
		const userPasswordResetRequestService = container.resolve(UserPasswordResetRequestService);

    let result = await userPasswordResetRequestService.execute(email);
		
		return response.json({ result });
	}	

	public async validateResetToken(request: Request, response: Response): Promise<Response> {

		const passwordResetToken = request.body as UserPasswordResetToken;

    const resetTokenValidation = container.resolve(UserPasswordResetTokenValidationService);

    const user = await resetTokenValidation.execute(passwordResetToken);
		let userRef = null;

		if ( user ) {

			userRef = {
				id: user.id,
				name: `${user.firstName} ${user.lastName}`,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt
			}
		}

    return response.json({ user: userRef ,  passwordResetToken: passwordResetToken.token });
	}	

	public async passwordReset(request: Request, response: Response): Promise<Response> {

		const userPasswordReset = request.body as UserPasswordResetDTO;

		const userPasswordResetService = container.resolve(UserPasswordResetService);

		const resetResult = await userPasswordResetService.execute(userPasswordReset);

		return response.json({resetResult: resetResult});
	}

}

export default UserPasswordResetController;