import AppError from '@common/errors/app-error';
import FilterParameters from '@common/infra/database/FilterParameters';
import { inject, injectable } from 'tsyringe';
import User from '../../model/User';
import UserRepository from '../../repositories/UserRepository';

@injectable()
class LoadUserService {

	constructor(
		@inject('UserRepository')
		 private userRepository: UserRepository) {
	}

	public async find(): Promise<User[] | undefined> {

		return await this.userRepository.find();
	}

	public async findById(userId: string): Promise<User | undefined> {

		const user = await this.userRepository.findById(userId);
		return user;
	}

	public async findByEmail( email: string ): Promise<User> {

    if (!email) {
      throw new AppError("Email parameter cannot be empty.");
    }

    return await this.userRepository.findByEmail( email );

  }

	public async filter(userFilterParams: FilterParameters): Promise<User[] | undefined> {

		return await this.userRepository.filter(userFilterParams);
	}

}

export default LoadUserService;