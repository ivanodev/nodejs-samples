import AEntityDeleteResult from "@common/infra/entity/AEntityDeleteResult";
import { inject, injectable } from "tsyringe";
import ActorRepository from "../repositories/ActorRepository";

@injectable()
class DeleteActorService {
  
	constructor(
		@inject('ActorRepository')
		private actorRespository: ActorRepository) {
	}

	public async execute(actorId: string): Promise<AEntityDeleteResult> {

		return this.actorRespository.delete(actorId);
	}
}

export default DeleteActorService;