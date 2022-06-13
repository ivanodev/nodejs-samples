import AEntityRepositoryDataBase from "@common/infra/entity/adapter/AEntityRepositoryDataBase";
import { createQueryExecute } from "@common/infra/database/queryexecute";
import Role from "@modules/access/model/Role";
import RoleRepository from "@modules/access/repositories/RoleRepository";
import { SELECT_ROLE_BY_NAME } from "@modules/access/sql";

class RoleRepositoryDataBase extends AEntityRepositoryDataBase<Role> implements RoleRepository {

	constructor() {
		super(Role, ['permissions']);
	}

	async findByName(name: string): Promise<Role | undefined> {

		const query = createQueryExecute(SELECT_ROLE_BY_NAME);

		query.setParameters({
			name: name
		})

		return await query.getRawOne();
	}
}

export default RoleRepositoryDataBase;