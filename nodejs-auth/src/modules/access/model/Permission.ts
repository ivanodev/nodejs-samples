import { DefaultFieldEntityType } from "@common/infra/database/DefaultFieldEntityContainer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PersistDefaultEntityField } from "@common/infra/decorator/PersistDefaultEntityField";

@PersistDefaultEntityField(DefaultFieldEntityType.all)
@Entity('permission')
class Permission {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@ManyToOne(type => Permission, permission => permission.childPermissions)
	@JoinColumn({ name: 'parentPermission', referencedColumnName: 'id'})
	parentPermission: Permission;
	
	@OneToMany(type => Permission, permission => permission.parentPermission)
	@JoinColumn({ name: 'parentPermission', referencedColumnName: 'id'})
	childPermissions: Permission[];

	@Column({ default: true })
	isActive: boolean

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@Column()
	createdBy: string;	

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@Column()
	updatedBy: string;	

	@Column({ type: 'timestamp' })
	deactivatedAt: Date

	@Column()
	deactivatedBy: string;
}

export default Permission;