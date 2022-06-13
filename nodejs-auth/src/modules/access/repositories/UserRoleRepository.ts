import { UserId } from "@modules/actor/types";
import UserRole from "../model/UserRole";
import { UserRoleId } from "../types";

interface UserRoleRepository  {

	create(userRole: UserRole): Promise<UserRole>;
	createList(userRoles: UserRole[]): Promise<UserRole[]>
	update(userRole: UserRole): Promise<UserRole>;
	updateList(userRoles: UserRole[]): Promise<UserRole[]>
	find(): Promise<UserRole[] | undefined>;
	findById(userRoleId: UserRoleId): Promise<UserRole | undefined>;
	findByIds(userRoleIds: UserRoleId[]): Promise<UserRole[] | undefined>;
	deleteByUser(userId: UserId): Promise<UserRole[]>
}

export default UserRoleRepository;