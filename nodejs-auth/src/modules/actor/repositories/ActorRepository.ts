import AEntityRepository from "@common/infra/entity/repositories/AEntityRepository";
import Actor from "../model/Actor";

interface ActorRepository extends AEntityRepository<Actor>  {

  findByEmail(email: string): Promise<Actor | undefined>;
}

export default ActorRepository;