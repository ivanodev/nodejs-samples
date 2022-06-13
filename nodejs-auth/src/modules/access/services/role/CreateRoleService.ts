import AppError from "@common/errors/app-error";
import RoleDTO from "@modules/access/dto/RoleDTO";
import { container, inject, injectable } from "tsyringe";
import Role from "../../model/Role";
import RoleRepository from "../../repositories/RoleRepository";
import LoadPermissionService from "../permission/LoadPermissionService";

@injectable()
class CreateRoleService {

	constructor(
		@inject('RoleRepository')
		private roleRepository: RoleRepository) {
	}

	public async execute(roleDTO: RoleDTO): Promise<Role | undefined> {

		try {

			const loadPermission = container.resolve(LoadPermissionService);
			let permissionIds = roleDTO.permissions as string[];
			let role = new Role();

			if (!permissionIds) {
				permissionIds = [];
			}

			const permissions = await loadPermission.findByIds(permissionIds);

			if (permissions) {

				const permissionListIsValid = permissionIds.every(permission => permissions.find(item => item.id === permission))

				if (!permissionListIsValid) {

					throw new AppError('Invalid permissions.', 500);
				}

				role.permissions = permissions;
			}

			const roleKeys = ['id', 'name', 'description', 'isActive', 'createdAt', 'updatedAt', 'deactivatedAt', 'createdBy', 'updatedBy', 'deactivatedBy'];

			roleKeys.forEach(key => {

				if (key !== 'permissions') {

					if (Reflect.has(roleDTO, key)) {
						const value = Reflect.get(roleDTO, key);
						Reflect.set(role, key, value);
					}
				}
			});

			return this.roleRepository.create(role);

		} catch (err) {

			throw new AppError('Error saving role.', 500);
		}

	}

}

export default CreateRoleService;

