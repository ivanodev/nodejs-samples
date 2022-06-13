import { container, inject, injectable } from 'tsyringe';
import Actor from '../model/Actor';
import ActorRepository from '../repositories/ActorRepository';
import User from '../model/User';
import CreateUserService from './User/CreateUserService';
import ActorServiceHelper from './ActorServiceHelper';
import AppError from '@common/errors/app-error';
import { ActorType } from '../enum';
import { InstanceActorContainer } from '../types';
import LoadUserService from './User/LoadUserService';
import UpdateUserService from './User/UpdateUserService';
import { createQueryExecute } from '@common/infra/database/queryexecute';
import { SELECT_ACTOR_EXISTS } from '../sql';
import RepositoryUtils from '@common/infra/entity/repositories/AEntityRepositoryUtils';

@injectable()
class SaveActorService {

	constructor(
		@inject('ActorRepository')
		private actorRepository: ActorRepository) {
	}

	private async saveActor(actor: Actor): Promise<Actor> {

		try {

			let actorExist = false;
			let actorType: ActorType[];
			let queryResult: any;

			if (actor.id) {

				const query = createQueryExecute(SELECT_ACTOR_EXISTS);
				query.setParameters({
					actorId: actor.id
				});

				queryResult = await query.getRawOne();

				if ( queryResult ) {

					actorExist = queryResult.actorExist;
				}
			}

			if (actorExist) {

				actorType = RepositoryUtils.parseEnumerator(queryResult.actorType) as ActorType[];

				actor.actorType.forEach( actType => {

					if ( !actorType.includes(actType.valueOf())) actorType.push(actType);

				});

				actor.actorType = actorType;
				return await this.actorRepository.update(actor);
			} else {

				return await this.actorRepository.create(actor);
			}

		} catch (err) {

			throw err;
		}

	}

	private async saveUser(user: User): Promise<User> {

		try {

			const loadUser = container.resolve(LoadUserService);

			const userExists = await loadUser.findById(user.id);

			if (userExists) {

				const updateUser = container.resolve(UpdateUserService);
				return await updateUser.execute(user);
			} else {

				const createUser = container.resolve(CreateUserService);
				return await createUser.execute(user);
			}

		} catch (err) {

			throw err;
		}
	}

	public async execute(actor: Actor): Promise<Actor> {

		try {

			const instancies = ActorServiceHelper.separateActorInstances(actor);
			const onlyActor = instancies[0] as Actor;

			const newActor = await this.saveActor(onlyActor);

			if (instancies.length > 1) {

				for (let i = 1; i < instancies.length; i++) {

					const instance = instancies[i] as InstanceActorContainer;

					if (instance.actorType === ActorType.user) {

						const user = instance.instance as User;

						user.id = newActor.id;
						await this.saveUser(user);
					}
				}
			}

			return newActor;
		} catch (err) {

			throw new AppError((err as any).message, 500);
		}
	}
}

export default SaveActorService;