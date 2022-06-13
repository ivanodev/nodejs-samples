import AEntityDeleteResult from "@common/infra/entity/AEntityDeleteResult";
import { inject, injectable } from "tsyringe";
import RoleRepository from "../../repositories/RoleRepository";

@injectable()
class DeleteRoleService {
  
	constructor(
		@inject('RoleRepository')
		private roleRepository: RoleRepository) {
	}

	public async execute(roleId: string): Promise<AEntityDeleteResult> {

		return this.roleRepository.delete(roleId);
	}
}

export default DeleteRoleService;

