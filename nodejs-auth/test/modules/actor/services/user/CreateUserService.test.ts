import 'reflect-metadata';
import sinon from 'sinon';
import UserServiceHelper from '@modules/actor/services/User/UserServiceHelper';
import CreateUserService from '@modules/actor/services/User/CreateUserService';
import User from '@modules/actor/model/User';
import FakeUserRepositoryDataBase from '../../fakerepositories/FakeUserRepositoryDataBase';

describe('CreateUserService', () => {
  it('should be able to create user', async() => {

    const userRepository = new FakeUserRepositoryDataBase();
    const createUserService = new CreateUserService(userRepository);

    const mockUserServiceHelper = sinon.mock(UserServiceHelper);
    mockUserServiceHelper.expects('validateUserRoles').returns(['123', '456']);

    const mockUser = {
      confirmedUser: true,
      activeUser: true,
      updatedAt: new Date(),
      updatedBy: '83f79dd6-1585-46ef-8b5a-136503d482fd',
      login: 'ivanoca.dev@gmail.com',
      password: 'alpa#2022',
      passwordMatch: 'alpa#2022'
    } as User;
    
    const mockUserRepositoryDataBase = sinon.mock(userRepository);

    mockUserRepositoryDataBase.expects('create').returns({
      ...mockUser, 
      id: '173a7b38-20ab-4bbd-9e7f-ee202aec2ec4'
    });

    const userCreated = await createUserService.execute(mockUser);

    mockUserRepositoryDataBase.verify();
    mockUserRepositoryDataBase.restore();

    sinon.assert.match('173a7b38-20ab-4bbd-9e7f-ee202aec2ec4', userCreated.id);
  });
});