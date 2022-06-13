import AppError from "@common/errors/app-error";
import AEntityDeleteResult from "@common/infra/entity/AEntityDeleteResult";
import { inject, injectable } from "tsyringe";
import { ActorType } from "../../enum";
import User from "../../model/User";
import ActorRepository from "../../repositories/ActorRepository";
import UserRepository from '../../repositories/UserRepository';

@injectable()
class DeleteUserService {

	constructor(
		@inject('UserRepository')
		private userRepository: UserRepository,
		@inject('ActorRepository')
		private actorRepository: ActorRepository) {
	}

	public async execute(userId: string): Promise<AEntityDeleteResult> {

		let deleteResult;

		try {

			const user = await this.userRepository.findById(userId) as User;

			if (user?.actorType.find(atype => atype == ActorType.user)) {

				if (user.actorType.length === 1) {

					deleteResult = await this.actorRepository.delete(userId);
				} else {

					deleteResult = await this.userRepository.delete(userId);
				}
			}

			return new AEntityDeleteResult(deleteResult);
		} catch (err) {

			throw new AppError(err as string, 500);
		}
	}
}

export default DeleteUserService;