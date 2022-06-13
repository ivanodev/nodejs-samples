import RequestUserAccessService from "@modules/access/services/user/RequestUserAccessService";
import { Request, Response } from 'express';
import { container } from "tsyringe";

class RequestUserAccessController {

  public async requestRandomUserAccess(request: Request, response: Response): Promise<Response> {

		const { email } = request.body;
		
		const requestUserAccessService = container.resolve(RequestUserAccessService);

    let result = await requestUserAccessService.execute(email);
		
		return response.json({ result });
	}
}

export default RequestUserAccessController;