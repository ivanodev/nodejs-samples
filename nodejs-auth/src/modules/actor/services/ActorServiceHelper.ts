import EntityUtils from "@common/infra/entity/AEntityUtils";
import { ActorType } from "../enum";
import Actor from "../model/Actor";
import User from "../model/User";

interface InstanceActorContainer {
  actorType: ActorType;
  instance: Actor;
}

class ActorServiceHelper {

  private static actorProps = [
    'id',
    'firstName',
    'lastName',
    'actorType',
    'personType',
    'email',
    'isActive',
    'createdAt',
    'updatedAt',
    'deactivatedAt',
    'createdBy',
    'updatedBy',
    'deactivatedBy'
  ];

  public static separateActorInstances(actor: Actor): Object[] {

    let instancies: Object[] = [];

    const onlyActor = EntityUtils.copyFieldsValue(actor, new Actor(), this.actorProps);
    instancies.push(Object(onlyActor));

    const allKeys = Object.keys(actor);

    const otherInstanceKeys = allKeys.filter(key => {

      if (this.actorProps.every(actorKey => actorKey !== key)) {
        return key;
      }

    });

    otherInstanceKeys.push('id');

    if (actor.actorType.includes(ActorType.user)) {

      const user = new User();

      otherInstanceKeys.forEach(key => {

        Reflect.set(Object(user), key, Reflect.get(actor, key));
      });

      const instance: InstanceActorContainer = {
        actorType: ActorType.user,
        instance: user
      }

      instancies.push(instance);
    }
    
    return instancies;
  }

}

export default ActorServiceHelper;