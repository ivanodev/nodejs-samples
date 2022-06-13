import { ActorType, PersonType } from "../enum";

class ActorDTO {
	
	id: string = '';
	firstName: string = '';
	lastName: string = '';
	email: string = '';
	actorType: ActorType[] = [];
  personType: PersonType = PersonType.corporation;
	isActive: boolean = true;
}

export default ActorDTO;