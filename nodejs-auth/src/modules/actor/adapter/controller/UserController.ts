import FilterParameters from '@common/infra/database/FilterParameters';
import User from '@modules/actor/model/User';
import CreateUserService from '@modules/actor/services/User/CreateUserService';
import DeleteUserService from '@modules/actor/services/User/DeleteUserService';
import LoadUserService from '@modules/actor/services/User/LoadUserService';
import UpdateUserService from '@modules/actor/services/User/UpdateUserService';

import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserController {

	public async create(request: Request, response: Response): Promise<Response> {

		const user = request.body as User;

		const createUser = container.resolve(CreateUserService);

		const userCreated = await createUser.execute(user);

		return response.json(userCreated);
	}

	public async update(request: Request, response: Response): Promise<Response> {

		const user = request.body as User;

		const updateUser = container.resolve(UpdateUserService);

		const userUpdated = await updateUser.execute(user);

		return response.json(userUpdated);
	}


	public async find(request: Request, response: Response): Promise<Response> {

		const loadUser = container.resolve(LoadUserService);

		const users = await loadUser.find();

		return response.json(users);
	}

	public async findById(request: Request, response: Response): Promise<Response> {

		const loadUser = container.resolve(LoadUserService);

		const { userId } = request.params;

		const user = await loadUser.findById(userId);

		return response.json(user);
	}

	public async filter(request: Request, response: Response): Promise<Response> {

		const userFilterParams = request.query as FilterParameters;

		const loadUser = container.resolve(LoadUserService);
		const users = await loadUser.filter(userFilterParams);

		return response.json(users);
	}

	public async findByEmail(request: Request, response: Response): Promise<Response> {

		const loadUser = container.resolve(LoadUserService);

		const { email } = request.params;

		const user = await loadUser.findByEmail(email);

		return response.json(user);
	}

	
	public async delete(request: Request, response: Response): Promise<Response> {

		const { userId } = request.params;

		const deletePermission = container.resolve(DeleteUserService);
		const deleteResult = await deletePermission.execute(userId);

		return response.json(deleteResult);
	}

}

export default UserController;