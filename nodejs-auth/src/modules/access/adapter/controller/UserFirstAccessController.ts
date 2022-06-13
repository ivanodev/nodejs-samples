import UserFirstAccessEnableRequestService from "@modules/access/services/user/UserFirstAccessEnableRequestService";
import UserFirstAccessEnableService from "@modules/access/services/user/UserFirstAccessEnableService";
import User from "@modules/actor/model/User";
import SaveActorService from "@modules/actor/services/SaveActorService";
import LoadUserService from "@modules/actor/services/User/LoadUserService";
import UpdateActorService from "@modules/actor/services/UpdateActorService";
import UserTokenValidationService, { UserToken } from "@modules/actor/services/User/UserTokenValidationService";
import { Request, Response } from 'express';
import { container } from "tsyringe";

class UserFirstAccessController {

  public async requestUserFirstAccess(request: Request, response: Response): Promise<Response> {

  	const { email } = request.body;

  	const userFirstAccess = container.resolve(UserFirstAccessEnableRequestService);

    let result = await userFirstAccess.execute(email);

  	return response.json({ result });
  }	

  public async validateUserFirstAccessToken(request: Request, response: Response): Promise<Response> {

    const userToken = request.body as UserToken;

    const userTokenValidationService = container.resolve(UserTokenValidationService);

    const user = await userTokenValidationService.execute(userToken);

    return response.json({ user: user, userFirstAccessToken: userToken.token });
}

	public async userFirstAccessEnable(request: Request, response: Response): Promise<Response> {

		const user = request.body as User;
    
		const userFirstAccessEnable = container.resolve(UserFirstAccessEnableService);

		const result = await userFirstAccessEnable.execute(user);

		return response.json(result);
	}

	public async updatePerfil(request: Request, response: Response): Promise<Response> {

		const user = request.body as User;
    
		const saveActor = container.resolve(SaveActorService);

		const result = await saveActor.execute(user);

		return response.json(result);
	}

	public async findById(request: Request, response: Response): Promise<Response> {

		const {userId} = request.params;
    
		const loadUser = container.resolve(LoadUserService);

		const result = await loadUser.findById(userId);

		return response.json(result);
	}

}

export default UserFirstAccessController;