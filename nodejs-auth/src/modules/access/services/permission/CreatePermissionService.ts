import { inject, injectable } from "tsyringe";
import Permission from "../../model/Permission";
import PermissionRepository from "../../repositories/PermissionRepository";

@injectable()
class CreatePermissionService {

	constructor(
		@inject('PermissionRepository')
		private permissionRepository: PermissionRepository) {
	}

	public async execute(permission: Permission): Promise<Permission> {

		return await this.permissionRepository.create(permission);
	}
}

export default CreatePermissionService;