import { inject, injectable } from 'tsyringe';
import Actor from '../model/Actor';
import ActorRepository from '../repositories/ActorRepository';

@injectable()
class LoadActorService {

	constructor(
		@inject('ActorRepository')
		 private actorRepository: ActorRepository) {
	}

	public async find(): Promise<Actor[] | undefined> {

		return this.actorRepository.find();
	}

	public async findById(actorId: string): Promise<Actor | undefined> {

		const actor = await this.actorRepository.findById(actorId);

		if( !actor ) return;

		if ( actor.actorType.includes(2)) {
			(actor as any).password = undefined;
			(actor as any).randomPassword = undefined;
		}

		return actor;
	}

	public async findByEmail(email: string): Promise<Actor | undefined> {

		return await this.actorRepository.findByEmail(email);
	}
}

export default LoadActorService;