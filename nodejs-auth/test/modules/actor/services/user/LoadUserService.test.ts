import 'reflect-metadata';
import sinon from 'sinon';
import UserServiceHelper from '@modules/actor/services/User/UserServiceHelper';
import CreateUserService from '@modules/actor/services/User/CreateUserService';
import User from '@modules/actor/model/User';
import FakeUserRepositoryDataBase from '../../fakerepositories/FakeUserRepositoryDataBase';
import LoadUserService from '@modules/actor/services/User/LoadUserService';

describe('CreateUserService', () => {
  it('should be able to load all users', async () => {

    const userRepository = new FakeUserRepositoryDataBase();
    const loadUserService = new LoadUserService(userRepository);

    const mockUsers = [
      {
        id: '83f79dd6-1585-46ef-8b5a-136503d482fd',
        confirmedUser: true,
        activeUser: true,
        updatedAt: new Date(),
        updatedBy: '83f79dd6-1585-46ef-8b5a-136503d482fd',
        login: 'ivanoca.dev@gmail.com',
      },
      {
        id: '173a7b38-20ab-4bbd-9e7f-ee202aec2ec4',
        confirmedUser: true,
        activeUser: true,
        updatedAt: new Date(),
        updatedBy: 'a9ffeabc-7b18-4a46-980e-e4a22e9f6965',
        login: 'daniela@gmail.com',
      }
    ] as User[];

    const mockUserRepositoryDataBase = sinon.mock(userRepository);

    mockUserRepositoryDataBase.expects('find').returns(mockUsers);

    const users = await loadUserService.find() as User[];

    mockUserRepositoryDataBase.verify();
    mockUserRepositoryDataBase.restore();

    sinon.assert.match('83f79dd6-1585-46ef-8b5a-136503d482fd', users[0].id);
  });
});