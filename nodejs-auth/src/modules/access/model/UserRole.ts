import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('userrole')
class UserRole {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	userId: string;

	@Column()
	roleId: string;
}

export default UserRole;