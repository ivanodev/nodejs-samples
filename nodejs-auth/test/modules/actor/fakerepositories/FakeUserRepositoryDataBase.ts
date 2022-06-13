import FilterParameters from "@common/infra/database/FilterParameters";
import AEntityDeleteResult from "@common/infra/entity/AEntityDeleteResult";
import User from "@modules/actor/model/User";
import UserRepository from "@modules/actor/repositories/UserRepository";

export default class FakeUserRepositoryDataBase implements UserRepository {

  findByEmail(login: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  updatePassword(password: string, companyId: string): Promise<number | undefined> {
    throw new Error("Method not implemented.");
  }
  updateRandomPassword(randomPassword: string, expiresAt: Date | undefined, companyId: string): Promise<number | undefined> {
    throw new Error("Method not implemented.");
  }
  updateToken(token: string | undefined, companyId: string): Promise<number | undefined> {
    throw new Error("Method not implemented.");
  }
  updateWithCredentials(company: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  create(entity: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  update(entity: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  find(): Promise<User[] | undefined> {
    throw new Error("Method not implemented.");
  }
  findById(entityId: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  findByIds(entityIds: string[]): Promise<User[] | undefined> {
    throw new Error("Method not implemented.");
  }
  filter(EntitySearchParams: FilterParameters): Promise<User[] | undefined> {
    throw new Error("Method not implemented.");
  }
  delete(entityId: string): Promise<AEntityDeleteResult> {
    throw new Error("Method not implemented.");
  }

}
