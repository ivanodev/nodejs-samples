import { PersistDefaultEntityField } from "@common/infra/decorator/PersistDefaultEntityField";
import { DefaultFieldEntityType } from "@common/infra/database/DefaultFieldEntityContainer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ActorType, PersonType } from "../enum";
import AEntity from "@common/infra/entity/AEntity";

@Entity('actor')
@PersistDefaultEntityField(DefaultFieldEntityType.all)
class Actor extends AEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	email: string;

	@Column({
		type: 'enum',
		enum: [0, 1, 2, 3, 4, 5],
		array: true
	})
	actorType: ActorType[];

	@Column({
		type: 'enum',
		enum: PersonType,
	})
	personType: PersonType

	@Column()
	isActive: boolean;

	@Column('timestamp')
	createdAt: Date;

	@Column()
	createdBy: string;

	@Column('timestamp')
	updatedAt: Date;

	@Column()
	updatedBy: string;

	@Column('timestamp')
	deactivatedAt: Date;

	@Column()
	deactivatedBy: string;
}

export default Actor;

