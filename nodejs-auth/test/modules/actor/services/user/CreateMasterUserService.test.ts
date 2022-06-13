import 'reflect-metadata';
import sinon from 'sinon';
import CreateMasterUserService from '@modules/actor/services/User/CreateMasterUserService';
import LoadUserService from '@modules/actor/services/User/LoadUserService';
import UserRepository from '@modules/actor/repositories/UserRepository';
import UserRepositoryDataBase from '@modules/actor/adapter/persistence/UserRepositoryDataBase';
import { container } from 'tsyringe';

describe('CreateMasterUserService', () => {
  it('should be able to create user master', async() => {

    const userRepository = sinon.fake.returns(UserRepositoryDataBase) ;
    const loadUserService = new LoadUserService(userRepository as unknown as UserRepository);

    const mockLoadUserService = sinon.mock(loadUserService);

    const mockContainer = sinon.mock(container);

    const mockUser = {
      confirmedUser: true,
      activeUser: true,
      updatedAt: new Date(),
      updatedBy: '83f79dd6-1585-46ef-8b5a-136503d482fd',
      login: 'ivanoca.dev@gmail.com',
      password: 'alpa#2022',
      passwordMatch: 'alpa#2022'
    }

    mockContainer.expects('resolve').returns(loadUserService);
    mockLoadUserService.expects('findById').returns(Promise.resolve(undefined));

    const createMasterUser = new CreateMasterUserService();
    const mockCreateMasterUserService = sinon.mock(createMasterUser);
    mockCreateMasterUserService.expects('createUser').returns(Promise.resolve({...mockUser, id: '83f79dd6-1585-46ef-8b5a-136503d482fd'}));

    const userCreated = await createMasterUser.execute();
    
    mockLoadUserService.verify();
    mockLoadUserService.restore();

    sinon.assert.match('83f79dd6-1585-46ef-8b5a-136503d482fd', userCreated.id);
  });
});