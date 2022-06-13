import AEntityRepositoryDataBase from "@common/infra/entity/adapter/AEntityRepositoryDataBase";
import { createQueryExecute } from "@common/infra/database/queryexecute";
import Permission from "@modules/access/model/Permission";
import PermissionRepository from "@modules/access/repositories/PermissionRepository";
import { SELECT_PERMISSION_BY_NAME } from "@modules/access/sql";

class PermissionRepositoryDataBase extends AEntityRepositoryDataBase<Permission> implements PermissionRepository {

	constructor(){
		super(Permission, ['parentPermission', 'childPermissions']);
	}

	async findByName(name: string): Promise<Permission> {
		
		const query = createQueryExecute(SELECT_PERMISSION_BY_NAME);

		query.setParameters({
			name: name
		});

		return await query.getRawOne();
	}
}

export default PermissionRepositoryDataBase;