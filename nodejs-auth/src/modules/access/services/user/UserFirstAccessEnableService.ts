import JwtUtils from "@common/infra/utils/JwtUtils";
import Actor from "@modules/actor/model/Actor";
import User from "@modules/actor/model/User";
import SaveActorService from "@modules/actor/services/SaveActorService";
import UpdateUserTokenService from "@modules/actor/services/User/UpdateUserTokenService";
import { container } from "tsyringe";
import LoadActorService from "@modules/actor/services/LoadActorService";
import EntityUtils from "@common/infra/entity/AEntityUtils";
import { Attachment, TemplateParams } from "@common/infra/mail/MailService";
import MailServiceFactory, { MailServiceType } from "@common/infra/mail/MailServiceFactory";

class UserFirstAccessEnableService {

	private loadActorService: LoadActorService;
	private saveActorService: SaveActorService;

	constructor() {
		this.loadActorService = container.resolve(LoadActorService);
		this.saveActorService = container.resolve(SaveActorService);
	}

	private async sendEmailUserFirstAccess(email: string, userFirstAccessToken: string): Promise<any> {

		const mailService = MailServiceFactory.createMailService();
		const subject = 'Portal Analytics - Convite';
		const templatePath = 'src/resources/mail/template/UserFirstAccess.html';
		const templateParams: TemplateParams[] = [
			{
				paramName: 'userFirstAccessToken',
				paramValue: userFirstAccessToken
			}
		];

		const attachments: Attachment[] = [
			{
				filename: `user-first-access.png`,
				path: `src/resources/image/user-first-access.png`,
				cid: 'userFirstAccessImg',
				contentDisposition: 'inline'
			}
		];

		const result = await mailService.sendEmail(
			email, subject, templatePath, templateParams, attachments
		);

		return result;
	}

	public async execute(user: User): Promise<User> {

		let userId = '';

		const actorFound = await this.loadActorService.findByEmail(user.email);

		if (actorFound) {
			EntityUtils.copyFieldsValue(actorFound, user, ['id', 'firstName', 'lastName', 'personType']);
		}

		const actorUser = await this.saveActorService.execute(user as Actor);
		userId = actorUser.id;

		const userFirstAccessToken = JwtUtils.GenerateToken(userId, '7d');

		const updateUserTokenService = container.resolve(UpdateUserTokenService);
		updateUserTokenService.execute(userFirstAccessToken, userId);

		this.sendEmailUserFirstAccess(user.email, userFirstAccessToken);

		return user;
	}
}

export default UserFirstAccessEnableService;