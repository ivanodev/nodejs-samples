import AEntityRepository from '@common/infra/entity/repositories/AEntityRepository';
import Role from '../model/Role';

interface RoleRepository extends AEntityRepository<Role> {
	
	findByName(name: string): Promise<Role | undefined>;
}

export default RoleRepository;