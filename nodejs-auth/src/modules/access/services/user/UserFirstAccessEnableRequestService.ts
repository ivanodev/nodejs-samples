import { injectable } from "tsyringe";
import MailServiceFactory from "@common/infra/mail/MailServiceFactory";
import { TemplateParams } from "@common/infra/mail/MailService";

@injectable()
class UserFirstAccessEnableRequestService {

	private async sendEmail(admEmail: string, userEmail: string): Promise<any> {

		const mailService = MailServiceFactory.createMailService();
		const subject = 'Auth - Solicitação de acesso';
		const templatePath = 'src/resources/mail/template/UseFirstAccessEnableRequest.html';
		const templateParams: TemplateParams[] = [
			{
				paramName: 'userEmail',
				paramValue: userEmail
			}
		];

		const result = await mailService.sendEmail(
			admEmail, subject, templatePath, templateParams, []
		);

		return result;
	}

	public async execute(userEmail: string): Promise<number | undefined> {

		const admEmail = 'ivano.carvalho@blueshift.com.br';

		this.sendEmail(admEmail, userEmail);

		return 1;
	}

}

export default UserFirstAccessEnableRequestService;