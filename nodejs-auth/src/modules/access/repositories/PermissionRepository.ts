import Permission from "../model/Permission";
import AEntityRepository from "@common/infra/entity/repositories/AEntityRepository";

interface PermissionRepository extends AEntityRepository<Permission> {

  findByName(name: string): Promise<Permission>
}

export default PermissionRepository;