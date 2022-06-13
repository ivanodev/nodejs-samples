import ActorDTO from "./dtos/ActorDTO";
import { ActorType } from "./enum";
import Actor from "./model/Actor";
import UserDTO from "./dtos/UserDTO";
import User from "./model/User";

class ActorHelper {

  private static parseUser(userDTO: UserDTO): User {

    const user = new User();

    const keys = Reflect.ownKeys(userDTO);

    keys.forEach(key => {

      const value = Reflect.get(userDTO, key);
      Reflect.set(user, key, value)
    });

    return user;
  }
  
  static parseActor(actorDTO: ActorDTO): Actor {

    let actor: Actor = new Actor();

 if (actorDTO.actorType.includes(ActorType.user)) {

      const userDTO = new UserDTO();

      const keys = Object.keys(actorDTO);

      keys.forEach(key => {

        Reflect.set(userDTO, key, Reflect.get(actorDTO, key));
      });

      actor = this.parseUser(userDTO);
    } 
    
    return actor;

  }

}

export default ActorHelper;