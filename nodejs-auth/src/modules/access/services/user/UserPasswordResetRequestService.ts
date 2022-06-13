import { Attachment, TemplateParams } from "@common/infra/mail/MailService";
import MailServiceFactory from "@common/infra/mail/MailServiceFactory";
import JwtUtils from "@common/infra/utils/JwtUtils";
import LoadUserService from "@modules/actor/services/User/LoadUserService";
import UpdateUserTokenService from "@modules/actor/services/User/UpdateUserTokenService";
import { container, injectable } from "tsyringe";

@injectable()
class UserPasswordResetRequestService {

	private loadUserService: LoadUserService;
	private updateUserTokenService: UpdateUserTokenService;

	constructor() {

		this.loadUserService = container.resolve(LoadUserService);
		this.updateUserTokenService = container.resolve(UpdateUserTokenService)
	}

	private async sendEmailUserPasswordResetRequest(email: string, userFirstName: string, passwordResetToken: string): Promise<any> {

		const mailService = MailServiceFactory.createMailService();
		const subject = 'Portal Analytics - Redefinição de senha';
		const templatePath = 'src/resources/mail/template/UserPasswordResetRequestService.html';
		const templateParams: TemplateParams[] = [
		 	{
		 		paramName: 'passwordResetToken',
		 		paramValue: passwordResetToken
		 	}
		];

		const attachments: Attachment[] = [
			{
				filename: `user-password-reset-request.png`,
				path: `src/resources/image/user-password-reset-request.png`,
				cid: 'requestResetUserAccessImg',
				contentDisposition: 'inline'
			}
		];

		const result = await mailService.sendEmail(
			email, subject, templatePath, templateParams, attachments
		);

		return result;
	}

	public async execute(email: string): Promise<number | undefined> {

		const user = await this.loadUserService.findByEmail(email);

		if (!user) {

			throw new Error('Incorrect email.');
		}		

		const passwordResetToken = JwtUtils.GenerateToken(user.id, '1h');
		
		this.updateUserTokenService.execute(passwordResetToken, user.id);

		this.sendEmailUserPasswordResetRequest(email, user.firstName, passwordResetToken);

  	return 1;
	}

}

export default UserPasswordResetRequestService;