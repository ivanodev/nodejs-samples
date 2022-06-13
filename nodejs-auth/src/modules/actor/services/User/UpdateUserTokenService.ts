import { inject, injectable } from "tsyringe";
import UserRepository from "../../repositories/UserRepository";
import UserHelper from "../../UserHelper";

@injectable()
class UpdateUserTokenService {

	constructor(
		@inject('UserRepository')
		private userRepository: UserRepository) {
	}

	public async execute(token: string, userId: string): Promise<number | undefined> {

		UserHelper.verifyJWToken(token);

		const updateResult = await this.userRepository.updateToken(token, userId);
		return updateResult;
	}
}

export default UpdateUserTokenService;