import { inject, injectable } from "tsyringe";
import PasswordUpdateDataDTO from "../../dtos/PasswordUpdateData";
import UserRepository from "../../repositories/UserRepository";
import UserHelper from "../../UserHelper";

@injectable()
class UpdateUserPasswordService {

	constructor(
		@inject('UserRepository')
		private userRepository: UserRepository) {
	}

	public async execute(passwordUpdateData: PasswordUpdateDataDTO): Promise<number | undefined> {

		const { password, randomPassword, randomPasswordExpiresAt, userId } = passwordUpdateData;
		let updateResult: number | undefined;

		if (password) {

			const cryptPassword = await UserHelper.encryptPassword(password);
			updateResult = await this.userRepository.updatePassword(cryptPassword, userId);
		}

		if (randomPassword) {

			const cryptPassword = await UserHelper.encryptPassword(randomPassword);
			updateResult = await this.userRepository.updateRandomPassword(cryptPassword, randomPasswordExpiresAt, userId);
		}

		return updateResult;
	}
}

export default UpdateUserPasswordService;