import SearchParameters from '@common/infra/database/FilterParameters';
import Permission from '@modules/access/model/Permission';
import PermissionRepository from '@modules/access/repositories/PermissionRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class LoadPermissionService {

	constructor(
		@inject('PermissionRepository')
		 private permissionRepository: PermissionRepository) {
	}

	public async find(): Promise<Permission[] | undefined> {

		return this.permissionRepository.find();
	}

	public async findById(permissionId: string): Promise<Permission | undefined> {

		return this.permissionRepository.findById(permissionId);
	}

	
	public async findByIds(permissionIds: string[]): Promise<Permission[] | undefined> {

		return this.permissionRepository.findByIds(permissionIds);
	}

	public async filter(PermissionSearchParams: SearchParameters): Promise<Permission[] | undefined> {

		return this.permissionRepository.filter(PermissionSearchParams);
	}

	public async findByName(name: string): Promise<Permission | undefined> {

		return await this.permissionRepository.findByName(name);
	}

}

export default LoadPermissionService;