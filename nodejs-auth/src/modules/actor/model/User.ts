import Role from "@modules/access/model/Role";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import Actor from "./Actor";

@Entity('user')
class User extends Actor {

	@Column()
	login: string;

	@Column()
	password: string;

	passwordMatch: string;

	@Column()
	randomPassword: string;

	@Column()
	randomPasswordExpiresAt: Date;

	@Column()
	token: string;

	@Column()
	confirmedUser: boolean;

	@ManyToMany(() => Role)
	@JoinTable({
		name: 'UserRole',
		joinColumn: { name: 'roleId', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'userId', referencedColumnName: 'id'}
	})
	roles: Role[];

	@Column()
	activeUser: boolean;

	@Column()
	lastAccess: Date;
}

export default User;
