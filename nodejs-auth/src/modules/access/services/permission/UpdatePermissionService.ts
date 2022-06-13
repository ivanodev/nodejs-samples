import Permission from '@modules/access/model/Permission';
import PermissionRepository from '@modules/access/repositories/PermissionRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdatePermissionService {

	constructor(
		@inject('PermissionRepository')
		private permissionRepository: PermissionRepository) {
	}

	public async execute(permission: Permission): Promise<Permission> {

		return await this.permissionRepository.update(permission);
	}

}

export default UpdatePermissionService;