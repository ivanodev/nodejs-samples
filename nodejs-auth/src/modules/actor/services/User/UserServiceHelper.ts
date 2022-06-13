import AppError from "@common/errors/app-error";
import Role from "@modules/access/model/Role";
import LoadRoleService from "@modules/access/services/role/LoadRoleService";
import { container } from "tsyringe";

class UserServiceHelper {

  public static async validateUserRoles(userRoles: Role[]): Promise<Role[]> {

		if ( !userRoles ) return [];

    const roleIds = userRoles.map(role => role.id ? role.id : role) as string[];

		const loadRoleService = container.resolve(LoadRoleService);
		const roles = await loadRoleService.findByIds(roleIds);

		if (roles) {

			const roleListIsValid = roleIds.every(role => roles.find(item => item.id === role))

			if (!roleListIsValid) {

				throw new AppError('Invalid roles list.', 500);
			}
		}		

    return roles ? roles : [];
	}
}

export default UserServiceHelper;