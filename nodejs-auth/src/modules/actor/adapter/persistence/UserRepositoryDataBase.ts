import AppError from "@common/errors/app-error";
import Role from "@modules/access/model/Role";
import UserRole from "@modules/access/model/UserRole";
import User from "@modules/actor/model/User";
import UserRepository from "@modules/actor/repositories/UserRepository";
import { createQueryBuilder, Entity, getRepository, Like, Repository } from "typeorm";
import AEntityRepositoryDataBase from '@common/infra/entity/adapter/AEntityRepositoryDataBase';
import FilterParameters from "@common/infra/database/FilterParameters";
import AEntityDeleteResult from "@common/infra/entity/AEntityDeleteResult";
import RepositoryUtils from "@common/infra/entity/repositories/AEntityRepositoryUtils";
import { ActorType } from "@modules/actor/enum";
import { createQueryExecute } from "@common/infra/database/queryexecute";
import { SELECT_USER_BY_ID } from "@modules/actor/sql";
import EntityUtils from "@common/infra/entity/AEntityUtils";

interface SaveUser {
	id?: string;
	login?: string;
	password?: string;
	token?: string;
	activeUser?: boolean;
	confirmedUser?: boolean;
}

class UserRepositoryDataBase extends AEntityRepositoryDataBase<User> implements UserRepository {

	private userRoleRepository: Repository<UserRole>;

	constructor() {

		super(User, []);
		this.userRoleRepository = getRepository(UserRole);
	}

	private prepareUser(user: User): SaveUser {

		const saveUser: SaveUser = {
			id: user.id,
			login: user.login,
			password: user.password,
			token: user.token,
			activeUser: user.activeUser,
			confirmedUser: user.confirmedUser
		}

		return saveUser;
	}

	private async saveUserRoles(roles: Role[], userId: string): Promise<UserRole[]> {

		const userRoles: UserRole[] = [];

		try {

			if (roles) {

				for (const key in roles) {

					const item = roles[key];

					let userRole = new UserRole();
					userRole.roleId = item.id;
					userRole.userId = userId;

					userRoles.push(userRole);
				}
			}

			await this.userRoleRepository.delete({
				userId: userId
			});

			if (userRoles && userRoles.length > 0) {
				await this.userRoleRepository.save(userRoles);
			}


		} catch (err) {

			console.log(err);
		}

		return userRoles;
	}

	private parseRole(rowDataPacketRole: any | any[]): Role | undefined {

		if (rowDataPacketRole && rowDataPacketRole.role_id) {

			const newRole = new Role();

			newRole.id = rowDataPacketRole.role_id;
			newRole.name = rowDataPacketRole.role_name;
			newRole.description = rowDataPacketRole.role_description;
			newRole.isActive = rowDataPacketRole.role_isActive;
			newRole.createdAt = rowDataPacketRole.role_createdAt;
			newRole.updatedAt = rowDataPacketRole.role_updatedAt;
			newRole.deactivatedAt = rowDataPacketRole.role_deactivatedAt;
			newRole.createdBy = rowDataPacketRole.role_createdBy;
			newRole.updatedBy = rowDataPacketRole.role_updatedBy;

			return newRole;
		}

		return undefined;
	}

	private normalizeEnuns(user: User): void {

		if (user) {

			const actorType = user.actorType as unknown as string;

			user.actorType = RepositoryUtils.parseEnumerator(actorType) as ActorType[];
			user.personType = Number(user.personType);
		}
	}

	public async create(user: User): Promise<User> {

		const insertQuery = createQueryBuilder<User>();

		const userValues = this.prepareUser(user);
		const userFields = Object.keys(userValues);

		const insertResult = await insertQuery
			.insert()
			.into(User, userFields)
			.values([userValues])
			.execute();

		if (insertResult.raw.affectedRows < 1) {

			throw new AppError('Error saving user.', 500);
		}

		if (user.roles) {
			await this.saveUserRoles(user.roles, user.id);
		}

		return user;
	}

	public async update(user: User): Promise<User> {

		const userValues = this.prepareUser(user);

		delete userValues.password;
		delete userValues.token;

		const updateQuery = createQueryBuilder<User>()
			.update(User)
			.set(userValues)
			.where('id = :id', { id: user.id });

		const updateResult = await updateQuery.execute();

		if (updateResult.raw.affectedRows < 1) {

			throw new AppError('Error saving user.', 500);
		}

		if (user.roles) {
			await this.saveUserRoles(user.roles, user.id);
		}

		return user;
	}

	public async updateWithCredentials(user: User): Promise<User> {

		const userValues = this.prepareUser(user);

		const updateQuery = createQueryBuilder<User>()
			.update('User')
			.set(userValues)
			.where('id = :id', { id: user.id });
			
		const updateResult = await updateQuery.execute();

		if (updateResult.raw.affectedRows < 1) {

			throw new AppError('Error saving user.', 500);
		}

		if (user.roles) {
			await this.saveUserRoles(user.roles, user.id);
		}

		return user;
	}

	public async updatePassword(password: string, userId: string): Promise<number | undefined> {

		const query = createQueryBuilder<User>()
			.update(User)
			.set({
				password
			})
			.where('id = :id', { id: userId });

		const result = await query.execute();

		return result.affected;
	}

	public async updateRandomPassword(randomPassword: string, expiresAt: Date | undefined, userId: string): Promise<number | undefined> {

		const query = createQueryBuilder<User>()
			.update(User)
			.set({
				randomPassword,
				randomPasswordExpiresAt: expiresAt
			})
			.where('id = :id', { id: userId });

		const result = await query.execute();

		return result.affected;
	}

	public async findByEmail(email: string): Promise<User> {

		if (!email) {
			throw new AppError("Login parameter cannot be empty.");
		}

		const query = createQueryBuilder<User>()
			.select('u.*, a."isActive", a."actorType", a."firstName", a."lastName"')
			.from('User', 'u')
			.innerJoin('Actor', 'a', 'a.id = u.id')
			.leftJoin('UserRole', 'ur', 'ur."userId" = u.id')
			.where('u."login" = :login')
			.setParameters({ login: email });

		const subQuery = createQueryBuilder<User>()
			.select()
			.from('User', 'u')
			.innerJoin('UserRole', 'ur', 'u.id = ur."userId"')
			.leftJoinAndMapOne('u."roles"', 'Role', 'role', 'role.id = ur."roleId"')
			.where('u."login" = :login')
			.setParameters({ login: email });

		const result = await query.getRawOne();

		if (result) {

			const useRoles = await subQuery.execute();
			result.roles = useRoles.map((role: any) => this.parseRole(role));
			result.actorType = RepositoryUtils.parseEnumerator(result.actorType);
			result.isActive = result.isActive === 1 ? true : false;
			result.activeUser = result.activeUser === 1 ? true : false;
			result.confirmedUser = result.confirmedUser === 1 ? true : false;
		}

		return result;
	}

	public async updateToken(token: string | undefined, userId: string): Promise<number | undefined> {

		try {

			const query = createQueryBuilder<User>()
				.update(User)
				.set({
					token
				})
				.where('id = :id', { id: userId });

			const result = await query.execute();

			return result.affected;


		} catch (err) {

			throw new AppError('Error updating token.', 500);
		}
	}

	public async find(): Promise<User[]> {

		const query = createQueryBuilder<User>()
			.select()
			.from('Actor', 'a')
			.leftJoin('User', 'u', 'u.id = a.id')
			.where(`'${ActorType.user}' = any (a.actorType)`);


		const result = await query.execute() as User[];

		if (result) {

			const userIds = result.map((item: any) => item.id);

			const subQuery = createQueryBuilder<User>()
				.select()
				.from('User', 'u')
				.addSelect('u.id as userId')
				.leftJoin('UserRole', 'ur', 'u.id = ur.userId')
				.innerJoinAndMapOne('u.roles', 'Role', 'role', 'role.id = ur.roleId')
				.where('u.id in ( :ids )')
				.setParameters({ ids: userIds });

			const roles = await subQuery.execute();

			result.forEach((item: any) => {

				const useRoles = roles.filter((role: any) => {

					if (role.userId === item.id) {

						return this.parseRole(role);
					}

				});

				const newRoles = useRoles.map((role: any) => this.parseRole(role));

				item.roles = newRoles;
				item.isActive = item.isActive === 1 ? true : false;
				item.activeUser = item.activeUser === 1 ? true : false;
				item.confirmedUser = item.confirmedUser === 1 ? true : false;

				this.normalizeEnuns(item);
			});

		}

		return result;
	}

	public async findById(userId: string): Promise<User | undefined> {

		const query = createQueryExecute(SELECT_USER_BY_ID);
		query.setParameters({
			userId: userId
		})

		const queryResult = await query.execute();

		if ( !queryResult || queryResult.length === 0 ) return;

		const user: User = new User();
		
		EntityUtils.copyFieldsValue(
			queryResult[0], user, 
			[
				'id', 'login', 'password', 'randomPassword', 'randomPasswordExpiresAt', 'token', 'activeUser', 'confirmedUser', 'lastAccess',
				'firstName', 'lastName', 'actorType', 'personType', 'email', 'isActive', 'createdAt', 'updatedAt', 'deactivateAt', 'createdBy', 'updatedBy', 'deactivateBy'
			]
		);

		user.isActive = queryResult[0].isActive === 1 ? true : false;
		user.activeUser = queryResult[0].activeUser === 1 ? true : false;
		user.confirmedUser = queryResult[0].confirmedUser === 1 ? true : false;
		user.roles = [];
		this.normalizeEnuns(user);

		for (const roleQueryResult of queryResult) {

			const role = new Role();
			role.id = roleQueryResult.roleId;
			role.name = roleQueryResult.name;
			role.description = roleQueryResult.description;
			user.roles.push(role);
		}

		return user;
	}

	public async findByIds(entityIds: string[]): Promise<User[] | undefined> {

		const query = createQueryBuilder<User>()
			.select()
			.from('Actor', 'a')
			.leftJoin('User', 'u', 'u.id = a.id')
			.where (`'${ActorType.user}' = any (a.actorType)`)

		const result = await query.execute() as User[];

		if (result) {

			const subQuery = createQueryBuilder<User>()
				.select()
				.from('User', 'u')
				.addSelect('u.id as userId')
				.leftJoin('UserRole', 'ur', 'u.id = ur.userId')
				.innerJoinAndMapOne('u.roles', 'Role', 'role', 'role.id = ur.roleId')
				.where('u.id in ( :ids )')
				.setParameters({ ids: entityIds });

			const roles = await subQuery.execute();

			result.forEach((item: any) => {

				const useRoles = roles.filter((role: any) => {

					if (role.userId === item.id) {

						return this.parseRole(role);
					}

				});

				const newRoles = useRoles.map((role: any) => this.parseRole(role));

				item.roles = newRoles;
				item.isActive = item.isActive === 1 ? true : false;
				item.activeUser = item.activeUser === 1 ? true : false;
				item.confirmedUser = item.confirmedUser === 1 ? true : false;

				this.normalizeEnuns(item);
			});

		}

		return result;
	}

	public async filter(entityFilterParams: FilterParameters): Promise<User[] | undefined> {

		const query = createQueryBuilder<User>()
			.select()
			.from('Actor', 'a')
			.innerJoin('User', 'u', 'u.id = a.id')
			.where (`'${ActorType.user}' = any (a.actorType)`)

		const keys = Object.keys(entityFilterParams);


		const params: any = {};
		let value;

		query.andWhere(`"${keys[0]}" like :${keys[0]}`);

		value = entityFilterParams[keys[0]];
		value = value === 'true' ? 1 : value === 'false' ? 0 : `%${value}%`;
		params[keys[0]] = `${value}`;

		for (let index = 1; index < keys.length; index++) {

			const key = keys[index];

			value = entityFilterParams[key];

			query.andWhere(`"${key}" like :${key}`);

			value = value === 'true' ? 1 : value === 'false' ? 0 : `%${value}%`;

			params[key] = `${value}`;
		}

		query.setParameters(params);

		const result = await query.getRawMany() as User[];

		if (result) {

			const userIds = result.map((item: User) => item.id);

			const subQuery = createQueryBuilder<User>()
				.select()
				.from('User', 'u')
				.addSelect('u.id as userId')
				.leftJoin('UserRole', 'ur', 'u.id = ur.userId')
				.innerJoinAndMapOne('u.roles', 'Role', 'role', 'role.id = ur.roleId')
				.where('u.id in ( :ids )')
				.setParameters({ ids: userIds });

			const roles = await subQuery.execute();

			result.forEach((item: any) => {

				const useRoles = roles.filter((role: any) => {

					if (role.userId === item.id) {

						return this.parseRole(role);
					}

				});

				const newRoles = useRoles.map((role: any) => this.parseRole(role));

				item.roles = newRoles;
				item.isActive = item.isActive === 1 ? true : false;
				item.activeUser = item.activeUser === 1 ? true : false;
				item.confirmedUser = item.confirmedUser === 1 ? true : false;

				this.normalizeEnuns(item);
			});

		}

		return result;
	}

	public async delete(userId: string): Promise<AEntityDeleteResult> {

		try {

			const deleteResult = await this.repository.delete(userId);
			return new AEntityDeleteResult(deleteResult);
		} catch (err) {

			throw new AppError(err as string, 500);
		}
	}
}

export default UserRepositoryDataBase;