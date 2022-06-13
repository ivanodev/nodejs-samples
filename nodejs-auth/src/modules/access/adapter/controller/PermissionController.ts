
import SearchParameters from "@common/infra/database/FilterParameters";
import Permission from "@modules/access/model/Permission";
import CreatePermissionService from "@modules/access/services/permission/CreatePermissionService";
import DeletePermissionService from "@modules/access/services/permission/DeletePermissionService";
import LoadPermissionService from "@modules/access/services/permission/LoadPermissionService";
import UpdatePermissionService from "@modules/access/services/permission/UpdatePermissionService";
import { Request, Response } from 'express';
import { container } from "tsyringe";

class PermissionController {

	public async create(request: Request, response: Response): Promise<Response> {

		const permission = request.body as Permission;

		const createPermission = container.resolve(CreatePermissionService);
		const permissionCreated = await createPermission.execute(permission);

		return response.json(permissionCreated);
	}

	public async update(request: Request, response: Response): Promise<Response> {

		const permission = request.body as Permission;

		const updatePermission = container.resolve(UpdatePermissionService);
		const permissionUpdated = await updatePermission.execute(permission);

		return response.json(permissionUpdated);
	}

	public async find(request: Request, response: Response): Promise<Response> {

		const loadPermission = container.resolve(LoadPermissionService);
		const permissions = await loadPermission.find();

		return response.json(permissions);
	}

	public async findById(request: Request, response: Response): Promise<Response> {

		const { permissionId } = request.params;

		const loadPermission = container.resolve(LoadPermissionService);
		const permission = await loadPermission.findById(permissionId);

		return response.json(permission);
	}

	public async filter(request: Request, response: Response): Promise<Response> {

		const permissionSearchParams = request.query as SearchParameters;

		const loadPermission = container.resolve(LoadPermissionService);
		const permssions = await loadPermission.filter(permissionSearchParams);

		return response.json(permssions);
	}


	public async delete(request: Request, response: Response): Promise<Response> {

		const { permissionId } = request.params;

		const deletePermission = container.resolve(DeletePermissionService);
		const deleteResult = await deletePermission.execute(permissionId);

		return response.json(deleteResult);
	}

}

export default PermissionController;