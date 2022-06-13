import { container, inject, injectable } from 'tsyringe';
import { ActorType } from '../enum';
import Actor from '../model/Actor';
import User from '../model/User';
import ActorRepository from '../repositories/ActorRepository';
import { InstanceActorContainer } from '../types';
import ActorServiceHelper from './ActorServiceHelper';
import UpdateUserService from './User/UpdateUserService';

@injectable()
class UpdateActorService {

	constructor(
		@inject('ActorRepository')
		private actorRepository: ActorRepository) {
	}

	private async saveUser(user: User): Promise<User> {

		const updateUser = container.resolve(UpdateUserService);
		const userUpdated = await updateUser.execute(user);
		return userUpdated;
	}

	public async execute(actor: Actor): Promise<Actor> {

		const instancies = ActorServiceHelper.separateActorInstances(actor);
		const onlyActor = instancies[0] as Actor;

		const updatedActor = await this.actorRepository.update(onlyActor);

		if (instancies.length > 1) {

			for (let i = 0; i < instancies.length; i++) {

				const instance = instancies[i] as InstanceActorContainer;

				if (instance.actorType === ActorType.user) {

					const user = instance.instance as User;

					user.id = updatedActor.id;
					await this.saveUser(user);
				}
			}

		}

		return updatedActor;
	}
}

export default UpdateActorService;