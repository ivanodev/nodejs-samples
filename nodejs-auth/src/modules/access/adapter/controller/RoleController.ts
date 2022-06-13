import FilterParameters from "@common/infra/database/FilterParameters";
import RoleDTO from "@modules/access/dto/RoleDTO"
import Role from "@modules/access/model/Role";
import CreateRoleService from "@modules/access/services/role/CreateRoleService";
import DeleteRoleService from "@modules/access/services/role/DeleteRoleService";
import LoadRoleService from "@modules/access/services/role/LoadRoleService";
import UpdateRoleService from "@modules/access/services/role/UpdateRoleService";
import { Request, Response } from 'express';
import { container } from "tsyringe";

class RoleController {

	public async create(request: Request, response: Response): Promise<Response> {

		const role = request.body as RoleDTO;
		
		const createRole = container.resolve(CreateRoleService);
		const roleCreated = await createRole.execute(role);

		return response.json(roleCreated);
	}

	public async update(request: Request, response: Response): Promise<Response> {

		const role = request.body as Role;

		const updateRole = container.resolve(UpdateRoleService);
		const roleUpdated = await updateRole.execute(role);

		return response.json(roleUpdated);
	}

	public async find(request: Request, response: Response): Promise<Response> {

		const loadRole = container.resolve(LoadRoleService);

		const roles = await loadRole.find();

		return response.json(roles);
	}

	public async findById(request: Request, response: Response): Promise<Response> {

		const { roleId } = request.params;

		const loadRole = container.resolve(LoadRoleService);

		const role = await loadRole.findById(roleId);

		return response.json(role);
	}

	public async filter(request: Request, response: Response): Promise<Response> {
		
		const roleFilterParams = request.query as FilterParameters;

		const loadRole = container.resolve( LoadRoleService );
		const permssions = await loadRole.filter(roleFilterParams);

		return response.json(permssions);
	}

	public async delete(request: Request, response: Response): Promise<Response> {

		const { roleId } = request.params;

		const deleteRole = container.resolve(DeleteRoleService);
		const deleteResult = await deleteRole.execute(roleId);

		return response.json(deleteResult);
	}


}

export default RoleController;