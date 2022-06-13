import AppError from '@common/errors/app-error';
import { inject, injectable } from 'tsyringe';
import User from '../../model/User';
import UserRepository from '../../repositories/UserRepository';
import UserHelper from '../../UserHelper';
import UserServiceHelper from './UserServiceHelper';

@injectable()
class UpdateUserService {

	constructor(
		@inject('UserRepository')
		private userRepository: UserRepository) {
	}

	public async execute(user: User): Promise<User> {

		try {

			let updateWithCredentials = false;

			if (user.password || user.passwordMatch) {

				if (user.password !== user.passwordMatch) {

					throw new AppError('Campos senha não coincidem.', 500);
				}

				const password = user.password as string;
				user.password = await UserHelper.encryptPassword(password);
				await this.userRepository.updateToken(undefined, user.id);

				updateWithCredentials = true;
			}

			user.roles = await UserServiceHelper.validateUserRoles(user.roles);

			user.updatedAt = new Date();

			if (updateWithCredentials) {

				return await this.userRepository.updateWithCredentials(user);
			} else {

				return await this.userRepository.update(user);
			}

		} catch ( err ) {

			throw new AppError((err as any).message, 500);
		}
	}
}

export default UpdateUserService;