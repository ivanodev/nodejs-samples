import ActorHelper from '@modules/actor/ActorHelper';
import ActorDTO from '@modules/actor/dtos/ActorDTO';
import SaveActorService from '@modules/actor/services/SaveActorService';
import LoadActorService from '@modules/actor/services/LoadActorService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ActorController {

	public async save(request: Request, response: Response): Promise<Response> {

		const actorDTO = request.body as ActorDTO;
		const actor = ActorHelper.parseActor( actorDTO );
		
		const saveActor = container.resolve( SaveActorService );
		const actorCreated = await saveActor.execute( actor );

		return response.json(actorCreated);
	}

	public async find(request: Request, response: Response): Promise<Response> {

		const loadActor = container.resolve( LoadActorService );

		const actors = await loadActor.find();

		return response.json(actors);
	}

	public async findById(request: Request, response: Response): Promise<Response> {

		const loadActor = container.resolve( LoadActorService );

		const { actorId } = request.params;

		const actor = await loadActor.findById(actorId);

		return response.json(actor);
	}

	public async findByEmail(request: Request, response: Response): Promise<Response> {

		const loadActor = container.resolve( LoadActorService );

		const { email } = request.params;

		const actor = await loadActor.findByEmail(email);

		return response.json(actor);
	}

}

export default ActorController;