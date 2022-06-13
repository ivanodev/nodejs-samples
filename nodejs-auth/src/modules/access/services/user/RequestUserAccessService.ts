import { Attachment, TemplateParams } from "@common/infra/mail/MailService";
import MailServiceFactory from "@common/infra/mail/MailServiceFactory";
import PasswordUpdateDataDTO from "@modules/actor/dtos/PasswordUpdateData";
import LoadUserService from "@modules/actor/services/User/LoadUserService";
import UpdateUserPasswordService from "@modules/actor/services/User/UpdateUserPasswordService";
import { container, injectable } from "tsyringe";

@injectable()
class RequestUserAccessService {

	private loadUserService: LoadUserService;
	private updateUserPasswordService: UpdateUserPasswordService;

	constructor() {

		this.loadUserService = container.resolve(LoadUserService);
		this.updateUserPasswordService = container.resolve(UpdateUserPasswordService);
	}

	private generateRandomPassword(): string {

		const letters = 4;
		const numbers = 6;
		const specialChar = 2;

		var chars = [
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", // letters
			"0123456789", // numbers			
			"!@#$%*" // special char
		];

		return [letters, numbers, specialChar].map(function (len, i) {
			return Array(len).fill(chars[i]).map(function (x) {
				return x[Math.floor(Math.random() * x.length)];
			}).join('');
		}).concat().join('').split('').sort(function () {
			return 0.5 - Math.random();
		}).join('');

	}

	private async sendEmailUserRandomAccess(email: string, userFirstName: string, password: string): Promise<any> {

		const mailService = MailServiceFactory.createMailService();
		const subject = 'Portal Analytics - Solicitacação de acesso';
		const templatePath = 'src/resources/mail/template/RequestRandomUserAccess.html';
		const templateParams: TemplateParams[] = [
			{
				paramName: 'password',
				paramValue: password
			}
		];

		const attachments: Attachment[] = [
			{
				filename: `bottom-random-user-access.png`,
				path: 'src/resources/image/bottom-random-user-access.png',
				cid: 'bottomRandomUserAccessImg',
				contentDisposition: 'inline'
			},
			{
				filename: `top-random-user-access.png`,
				path: `src/resources/image/top-random-user-access.png`,
				cid: 'topRandomUserAccessImg',
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

		if (user) {

			const randomPassword = this.generateRandomPassword();

			const expiresAt = new Date();
			expiresAt.setHours(expiresAt.getHours() + 6);

			const passwordUpdateDataDTO: PasswordUpdateDataDTO = {
				randomPassword,
				userId: user.id,
				randomPasswordExpiresAt: expiresAt
			}

			const statusResult = await this.updateUserPasswordService.execute(passwordUpdateDataDTO);

			if (statusResult && statusResult >= 1) {

				this.sendEmailUserRandomAccess(email, user.firstName, randomPassword);
			}

			return statusResult;
		}

	}

}

export default RequestUserAccessService;