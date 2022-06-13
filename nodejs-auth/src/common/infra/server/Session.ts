
import { UserId } from "@modules/actor/types";
import ServerContext from "./ServerContext";

interface UserSession {
  id: UserId;
  name: string;
}

export default class Session {

  public static get user(): UserSession {

    return ServerContext.get('user') as UserSession;
  }

  public static set user( user: UserSession ) {

    ServerContext.set( 'user', user );
  }

  public static get company(): any {

    return ServerContext.get('company');
  }

  public static set company( company: any ) {

    ServerContext.set( 'company', company );
  }
  
  public static get professionalProfile(): any {

    return ServerContext.get('professionalProfile');
  }

  public static set professionalProfile( professionalProfile: any ) {

    ServerContext.set( 'professionalProfile', professionalProfile );
  }

  public static get permissions(): any {

    return ServerContext.get('permissions');
  }

  public static set permissions( permissions: any ) {

    ServerContext.set( 'permissions', permissions );
  }

}