import FilterParameters from "@common/infra/database/FilterParameters"
import Role from "@modules/access/model/Role";
import RoleRepository from "@modules/access/repositories/RoleRepository";
import { inject, injectable } from 'tsyringe';


@injectable()
class LoadRoleService {

	constructor(
		@inject('RoleRepository')
		private roleRepository: RoleRepository) {
	}

	public async find(): Promise<Role[] | undefined> {

		return this.roleRepository.find();
	}

	public async findById(roleId: string): Promise<Role | undefined> {

		return this.roleRepository.findById(roleId);
	}

	public async findByIds(roleIds: string[]): Promise<Role[] | undefined> {

		return this.roleRepository.findByIds(roleIds);
	}

	public async filter(roleFilterParams: FilterParameters): Promise<Role[] | undefined> {

		return this.roleRepository.filter(roleFilterParams);
	}

	public async findByName(name: string): Promise<Role | undefined> {

		return await this.roleRepository.findByName(name);
	}

}

export default LoadRoleService;