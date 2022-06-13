import { ActorType } from "../enum";
import Actor from "../model/Actor";

type UserId = string;
type ActorId = string;

interface InstanceActorContainer {
	actorType: ActorType;
	instance: Actor;
}

export {
  ActorId,
  UserId,
  InstanceActorContainer
}