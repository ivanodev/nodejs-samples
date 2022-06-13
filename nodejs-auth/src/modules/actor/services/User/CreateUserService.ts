import { inject, injectable } from 'tsyringe';
import User from '../../model/User';
import UserRepository from '../../repositories/UserRepository';
import UserHelper from '../../UserHelper';
import UserServiceHelper from './UserServiceHelper';
import AppError from '@common/errors/app-error';

@injectable()
class CreateUserService {

	constructor(
		@inject('UserRepository')
		private userRepository: UserRepository) {
	}

	public async execute(user: User): Promise<User> {

		// TODO: checar se credenciais já existem

		try {

			user.roles = await UserServiceHelper.validateUserRoles(user.roles);
			user.confirmedUser = false;

			if (user.password) {

				const password = user.password as string;
			 	user.password = await UserHelper.encryptPassword(password);
			}

			const userCreated = await this.userRepository.create(user);
			return userCreated;
		} catch( err ) {

			throw new AppError((err as any).message, 500);
		}		
	}
}

export default CreateUserService;