import RepositoryUtils from "@common/infra/entity/repositories/AEntityRepositoryUtils";
import AEntityRepositoryDataBase from "@common/infra/entity/adapter/AEntityRepositoryDataBase";
import { ActorType } from "@modules/actor/enum";
import Actor from "@modules/actor/model/Actor";
import ActorRepository from "@modules/actor/repositories/ActorRepository";
import UserRepository from "@modules/actor/repositories/UserRepository";
import { createQueryBuilder } from "typeorm";
import UserRepositoryDataBase from "./UserRepositoryDataBase";
import AppError from "@common/errors/app-error";
import { createQueryExecute } from "@common/infra/database/queryexecute";
import { SELECT_ACTOR } from "@modules/actor/sql";
import User from "@modules/actor/model/User";


class ActorRepositoryDataBase extends AEntityRepositoryDataBase<Actor> implements ActorRepository {

	private userRepository: UserRepository;

	constructor() {

		super(Actor);

		this.userRepository = new UserRepositoryDataBase();
	}

	private async loadChildrenData(actor: Actor): Promise<void> {

		if (actor.actorType.includes(ActorType.user)) {

			const user = await this.userRepository.findById(actor.id) as User;

			if (user) {

				(actor as User).roles = user.roles;
			}

		}
	}

	private normalizeEnumerators(actor: Actor): void {

		actor.actorType = RepositoryUtils.parseEnumerator(actor.actorType as unknown as string) as ActorType[];
		actor.personType = Number(actor.personType);
	}

	public async create(actor: Actor): Promise<Actor> {

		const actorExists = await this.findByEmail(actor.email);

		if (actorExists) {

			const actorTypeExists = actor.actorType.every(actorType => actorExists.actorType.includes(actorType));

			if (actorTypeExists) {

				throw new AppError('there is already an actor registered with this email.');
			}

			actor.id = actorExists.id;
		}

		return super.create(actor);
	}


	public async find(): Promise<Actor[]> {

		const query = createQueryBuilder<Actor>()
			.select('a.id, a.actorType')
			.from('Actor', 'a');

		const result = await query.execute() as Actor[];
		const userIds: string[] = [];

		let actors: Actor[] = [];

		result.forEach((actor: Actor) => {

			actor.actorType = RepositoryUtils.parseEnumerator(actor.actorType as unknown as string);

			if (actor.actorType.includes(ActorType.user)) {

				userIds.push(actor.id);
			}
		});

		if (userIds.length > 0) {

			const users = await this.userRepository.findByIds(userIds);
			actors = actors.concat(users as Actor[]);
		}

		return actors;
	}


	public async findById(actorId: string): Promise<Actor | undefined> {

		const query = createQueryExecute(SELECT_ACTOR);

		query.addCondition('where a.id = :actorId');
		query.setParameters({
			actorId: actorId
		});

		const actor = await query.getRawOne();

		this.normalizeEnumerators(actor);

		await this.loadChildrenData(actor);
				
		return actor;
	}


	public async findByIds(actorIds: string[]): Promise<Actor[] | undefined> {

		const query = createQueryBuilder<Actor>()
			.select(['id', 'actorType'])
			.from('Actor', 'a')
			.where('id in ( :ids )', { id: actorIds });

		const result = await query.execute() as Actor[];
		const userIds: string[] = [];

		let actors: Actor[] = [];

		result.forEach((actor: Actor) => {

			actor.actorType = RepositoryUtils.parseEnumerator(actor.actorType as unknown as string);

			if (actor.actorType.includes(ActorType.user)) {

				userIds.push(actor.id);
			}
		});

		if (userIds.length > 0) {

			const users = await this.userRepository.findByIds(userIds);
			actors = actors.concat(users as Actor[]);
		}

		return actors;
	}

	async findByEmail(email: string): Promise<Actor | undefined> {

		const query = createQueryExecute(SELECT_ACTOR);

		query.addCondition('where a.email = :email');
		query.setParameters({
			email: email
		});

		const actor = await query.getRawOne();

		if (!actor) return;

		this.normalizeEnumerators(actor);
		await this.loadChildrenData(actor);

		return actor;
	}
}

export default ActorRepositoryDataBase;