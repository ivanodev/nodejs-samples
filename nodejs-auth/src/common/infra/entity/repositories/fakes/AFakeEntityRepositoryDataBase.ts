import FilterParameters from "@common/infra/database/FilterParameters"
import AEntityDeleteResult from "@common/infra/entity/AEntityDeleteResult";
import AEntity from "@common/infra/entity/AEntity";
import DefaultFieldEntityContainer from "@common/infra/database/DefaultFieldEntityContainer";
import { uuid } from "uuidv4";
import AEntityRepository from "../AEntityRepository";

export default class AFakeEntityRepositoryDataBase<T extends AEntity> implements AEntityRepository<AEntity> {

	protected entities: T[] = [];

	protected relations: string[];
	private entityName: string;

	constructor(type: any, relations?: string[]) {

		this.relations = relations ? relations : [];
		this.entityName = type['name'];
	}

	private async fillDefaultField(entity: any, defaultField: 'created' | 'updated'): Promise<void> {

		try {

			if (defaultField === 'created') {

				if (DefaultFieldEntityContainer.hasCreatedField(this.entityName)) {

					if (!entity['createdBy']) {

						entity['createdBy'] = 'Automated Tests';
					}
				}
			} else {

				if (DefaultFieldEntityContainer.hasUpdatedField(this.entityName)) {

					entity['updatedAt'] = new Date();
					entity['updatedBy'] = 'Automated Tests';
				}

				const ent = await this.entities.find((ent: any) => ent['id'] === entity['id']);

				if (ent) {

					if ((ent as any)['isActive'] && !(entity as any)['isActive']) {

						entity['deactivatedAt'] = new Date();
						entity['deactivatedBy'] = 'Automated Tests';
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

			if ( !Reflect.get(entity, 'id' )) {

				Reflect.set(entity, 'id', uuid());
			}

			await this.fillDefaultField(entity, 'created');
			this.entities.push(entity);

			return entity;
		} catch (err) {

			throw err;
		}
	}

	public async update(entity: T): Promise<T> {

		try {

			await this.fillDefaultField(entity, 'updated');
			await this.entities.push(entity as any);
			return entity;
		} catch (err) {

			throw err;
		}
	}

	public async find(): Promise<T[]> {

		return await this.entities as T[];
	}

	public async findById(entityId: string): Promise<T | undefined> {

		try {

			const entity = await this.entities.find((ent: any) => ent.id === entityId) as T;
			return entity as T;
		} catch (err) {

			throw err;
		}
	}


	public async findByIds(entityIds: string[]): Promise<T[] | undefined> {

		try {
			return await this.entities.map((ent: any) => {

				if (entityIds.some(id => ent.id === id)) {
					return ent;
				}
			});
		} catch (err) {

			throw err;
		}
	}

	public async filter(entityFilterParams: FilterParameters): Promise<T[] | undefined> {

		// try {

		// 	const keys = Object.keys(entityFilterParams);

		// 	const params: any = {};

		// 	keys.forEach(key => {

		// 		let value = entityFilterParams[key];

		// 		value = value === 'true' ? 1 : value === 'false' ? 0 : value;

		// 		params[key] = Like(`%${value}%`)
		// 	});

		// 	return await this.repository.find({
		// 		where: params
		// 	});
		// } catch (err) {

		// 	throw err;
		// }

		return undefined;
	}

	public async delete(entityId: string): Promise<AEntityDeleteResult> {

		try {

			const index = this.entities.findIndex((ent: any) => ent.id === entityId);

			if (index >= 0) {

				this.entities = await this.entities.splice(index, 1);
			}

			const deleteResult = {
				"deleteResult": {
					"raw": [],
					"affected": 1
				}
			}

			return new AEntityDeleteResult(deleteResult);
		} catch (err) {

			throw err;
		}
	}
}