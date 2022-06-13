import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('permissionrole')
class PermissionRole {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	permissionId: string;

	@Column()
	roleId: string;
}

export default PermissionRole;