import AEntityRepository from "@common/infra/entity/repositories/AEntityRepository";
import User from "../model/User";

interface UserRepository extends AEntityRepository<User> {

  findByEmail(login: string): Promise<User>;
  updatePassword(password: string, companyId: string): Promise<number | undefined>;
  updateRandomPassword(randomPassword: string, expiresAt: Date | undefined, companyId: string): Promise<number | undefined>;
  updateToken(token: string | undefined, companyId: string): Promise<number | undefined>;
  updateWithCredentials(company: User): Promise<User>;
}

export default UserRepository;