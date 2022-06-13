import AEntityDeleteResult from "@common/infra/entity/AEntityDeleteResult";
import { inject, injectable } from "tsyringe";
import PermissionRepository from "../../repositories/PermissionRepository";

@injectable()
class DeletePermissionService {
  
	constructor(
		@inject('PermissionRepository')
		private permissionRepository: PermissionRepository) {
	}

	public async execute(permissionId: string): Promise<AEntityDeleteResult> {

		return await this.permissionRepository.delete(permissionId);
	}
}

export default DeletePermissionService;

