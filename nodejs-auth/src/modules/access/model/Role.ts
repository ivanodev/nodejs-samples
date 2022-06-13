import { DefaultFieldEntityType } from "@common/infra/database/DefaultFieldEntityContainer";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Permission from "./Permission";
import { PersistDefaultEntityField } from "@common/infra/decorator/PersistDefaultEntityField";

@Entity('role')
@PersistDefaultEntityField(DefaultFieldEntityType.all)
class Role {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

	@Column({default: true})
	isActive: boolean;

	@ManyToMany(() => Permission)
	@JoinTable({
		name: 'permissionrole',
		joinColumn: { name: 'roleId' },
		inverseJoinColumn: { name: 'permissionId' }
	})
	permissions: Permission[];	

	@CreateDateColumn({type: 'timestamp', default: new Date()})
	createdAt: Date;

	@Column()
	updatedBy: string;	

	@UpdateDateColumn({type: 'timestamp'})
	updatedAt: Date;

	@Column()
	createdBy: string;

	@Column({type: 'timestamp'})
	deactivatedAt: Date

	@Column()
	deactivatedBy: string	
}

export default Role;