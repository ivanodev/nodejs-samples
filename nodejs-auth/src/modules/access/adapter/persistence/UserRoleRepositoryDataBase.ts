import UserRole from "@modules/access/model/UserRole";
import UserRoleRepository from "@modules/access/repositories/UserRoleRepository";
import { UserRoleId } from "@modules/access/types";
import { UserId } from "@modules/actor/types";
import { getRepository, Repository } from "typeorm";

class UserRoleRepositoryDataBase implements UserRoleRepository {

	private repository: Repository<UserRole>

	constructor() {

		this.repository = getRepository(UserRole);
	}

	public async create(userRole: UserRole): Promise<UserRole> {

		return await this.repository.save(userRole);
	}

	public async createList(userRoles: UserRole[]): Promise<UserRole[]> {

		return await this.repository.save(userRoles);
	}

	public async update(userRole: UserRole): Promise<UserRole> {

		return await this.repository.save(userRole);
	}

	public async updateList(userRoles: UserRole[]): Promise<UserRole[]> {

		return await this.repository.save(userRoles);
	}

	public async find(): Promise<UserRole[] | undefined> {

		return await this.repository.find();
	}

	public async findById(userRoleId: UserRoleId): Promise<UserRole | undefined> {

		const userRole = await this.repository.findOne({
			where: {
				id: userRoleId
			}
		});

		return userRole;
	}

	public async findByIds(userRoleIds: UserRoleId[]): Promise<UserRole[] | undefined> {

		return await this.repository.findByIds(userRoleIds);
	}

	public async deleteByUser(userId: UserId): Promise<any> {

		return await this.repository.delete({
      userId: userId 
    });
	}
}

export default UserRoleRepositoryDataBase;