import AppError from "@common/errors/app-error";
import { container, injectable } from "tsyringe";
import { ActorType, PersonType } from "../../enum";
import User from "../../model/User";
import SaveActorService from '../SaveActorService';
import LoadUserService from "./LoadUserService";

@injectable()
class CreateMasterUserService {

	private async createUser(): Promise<User> {

		try {

			const user = new User();

			user.id = '83f79dd6-1585-46ef-8b5a-136503d482fd'
			user.firstName = 'Master';
			user.actorType = [ActorType.user];
			user.createdAt = new Date();
			user.createdBy = '83f79dd6-1585-46ef-8b5a-136503d482fd'
			user.email = 'master@email.com';
			user.confirmedUser = true;
			user.activeUser = true;
			user.login = 'ivanoca.dev@gmail.com';
			user.password = 'alpa#2022';
			user.passwordMatch = 'alpa#2022';
			user.roles = [];
			user.personType = PersonType.individual;

			const createActor = container.resolve(SaveActorService);
			return await createActor.execute(user) as User;

		} catch (err) {

			throw err;
		}
	}

	public async execute(): Promise<User> {

		try {

			const loadUserService = container.resolve(LoadUserService);
			let user = await loadUserService.findById('83f79dd6-1585-46ef-8b5a-136503d482fd');

			if (!user) {

				console.log('Creating master user...');
				user = await this.createUser();

				console.log('Master user created successfully.');
			}

			return user;

		} catch (err) {

			throw new AppError('Error when create user master.', 501);
		}
	}
}

export default CreateMasterUserService;