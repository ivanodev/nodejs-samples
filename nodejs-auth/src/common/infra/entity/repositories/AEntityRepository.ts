import AEntityDeleteResult from "@common/infra/entity/AEntityDeleteResult";
import SearchParameters from "@common/infra/database/FilterParameters";

interface AEntityRepository<T> {
	create(entity: T): Promise<T>;
	update(entity: T): Promise<T>;
	find(): Promise<T[] | undefined>;
	findById(entityId: string): Promise<T | undefined>;
	findByIds(entityIds: string[]): Promise<T[] | undefined>;
	filter(EntitySearchParams: SearchParameters):Promise<T[] | undefined>;
	delete(entityId: string): Promise<AEntityDeleteResult>;
}

export default AEntityRepository;