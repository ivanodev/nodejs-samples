import AppError from '@common/errors/app-error';
import Role from '@modules/access/model/Role';
import RoleRepository from '@modules/access/repositories/RoleRepository';
import { container, inject, injectable } from 'tsyringe';
import LoadPermissionService from '../permission/LoadPermissionService';

@injectable()
class UpdateRoleService {

	constructor(
		@inject('RoleRepository')
		private roleRepository: RoleRepository) {
	}

	public async execute(role: Role): Promise<Role> {
		
		const permissionIds = role.permissions as unknown as string[];

		const loadPermission = container.resolve( LoadPermissionService );
		const permissions = await loadPermission.findByIds( permissionIds );

		if ( permissions ) {

			const permissionListIsValid = permissionIds.every( permission => permissions.find( item => item.id === permission ) )

			if ( !permissionListIsValid ) {

				throw new AppError('Invalid permissions.', 500 );
			}

			role.permissions = permissions;
		}		

		role.updatedAt = new Date();
		return this.roleRepository.update(role);
	}

}

export default UpdateRoleService;