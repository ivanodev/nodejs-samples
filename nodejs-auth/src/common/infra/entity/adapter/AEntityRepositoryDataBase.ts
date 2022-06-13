import FilterParameters from "@common/infra/database/FilterParameters"
import { getRepository, Like, Repository } from "typeorm";
import AEntityRepository from "../repositories/AEntityRepository";
import AEntityDeleteResult from "@common/infra/entity/AEntityDeleteResult";
import AEntity from "@common/infra/entity/AEntity";
import DefaultFieldEntityContainer from "@common/infra/database/DefaultFieldEntityContainer";
import Session from "@common/infra/server/Session";

export default class AEntityRepositoryDataBase<T extends AEntity> implements AEntityRepository<AEntity> {

	protected repository: Repository<T>;
	protected relations: string[];
	private entityName: string;

	constructor(type: any, relations?: string[]) {

		this.repository = getRepository(type);
		this.relations = relations ? relations : [];
		this.entityName = type['name'];
	}

	private async fillDefaultField(entity: any, defaultField: 'created' | 'updated'): Promise<void> {

		try {

			if (defaultField === 'created') {

				if (DefaultFieldEntityContainer.hasCreatedField(this.entityName)) {

					if (!entity['createdBy']) {

						entity['createdBy'] = Session.user.id;
					}
				}
			} else {

				if (DefaultFieldEntityContainer.hasUpdatedField(this.entityName)) {

					entity['updatedAt'] = new Date();
					entity['updatedBy'] = Session.user ?  Session.user.id : '83f79dd6-1585-46ef-8b5a-136503d482fd';
				}

				const ent = await this.repository.findOne(entity['id']);

				if (ent) {

					entity['createdBy'] = (ent as any).createdBy;

					if ((ent as any)['isActive'] && !(entity as any)['isActive']) {

						entity['deactivatedAt'] = new Date();
						entity['deactivatedBy'] = Session.user.id;
					} else if ((ent as any)['isActive'] !== entity['isActive']) {

						entity['deactivatedAt'] = null;
						entity['deactivatedBy'] = null;
					}
				}
			}

		} catch (err) {

			throw err;
		}
	}

	public async create(entity: T): Promise<T> {

		try {

			await this.fillDefaultField(entity, 'created');
			const entityCreated = await this.repository.save(entity as any);
			return entityCreated;
		} catch (err) {

			throw err;
		}
	}

	public async update(entity: T): Promise<T> {

		try {

			await this.fillDefaultField(entity, 'updated');
			const entityCreated = await this.repository.save(entity as any) as T;

			return entityCreated;
		} catch (err) {

			throw err;
		}
	}

	public async find(): Promise<T[]> {

		return await this.repository.find({
			relations: this.relations
		});
	}

	public async findById(entityId: string): Promise<T | undefined> {

		try {

			const entity = await this.repository.findOne({
				where: {
					id: entityId
				},
				relations: this.relations
			}) as T;

			return entity as T;
		} catch (err) {

			throw err;
		}
	}


	public async findByIds(entityIds: string[]): Promise<T[] | undefined> {

		try {
			return await this.repository.findByIds(entityIds);
		} catch (err) {

			throw err;
		}
	}

	public async filter(entityFilterParams: FilterParameters): Promise<T[] | undefined> {

		try {

			const keys = Object.keys(entityFilterParams);

			const params: any = {};

			keys.forEach(key => {

				let value = entityFilterParams[key];

				value = value === 'true' ? 1 : value === 'false' ? 0 : value;

				params[key] = Like(`%${value}%`)
			});

			return await this.repository.find({
				where: params
			});
		} catch (err) {

			throw err;
		}
	}

	public async delete(entityId: string): Promise<AEntityDeleteResult> {

		try {

			const deleteResult = await this.repository.delete(entityId);
			return new AEntityDeleteResult(deleteResult);
		} catch (err) {

			throw err;
		}
	}
}