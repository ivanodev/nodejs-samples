import { container } from 'tsyringe';

import PermissionRepositoryDataBase from '@modules/access/adapter/persistence/PermissionRepositoryDataBase';
import RoleRepositoryDataBase from '@modules/access/adapter/persistence/RoleRepositoryDataBase';
import UserRoleRepositoryDataBase from '@modules/access/adapter/persistence/UserRoleRepositoryDataBase';
import PermissionRepository from '@modules/access/repositories/PermissionRepository';
import RoleRepository from '@modules/access/repositories/RoleRepository';
import UserRoleRepository from '@modules/access/repositories/UserRoleRepository';
import ActorRepositoryDataBase from '@modules/actor/adapter/persistence/ActorRepositoryDataBase';
import UserRepositoryDataBase from '@modules/actor/adapter/persistence/UserRepositoryDataBase';
import ActorRepository from '@modules/actor/repositories/ActorRepository';
import UserRepository from '@modules/actor/repositories/UserRepository';

container.registerSingleton<ActorRepository>('ActorRepository', ActorRepositoryDataBase);
container.registerSingleton<UserRepository>('UserRepository', UserRepositoryDataBase);
container.registerSingleton<PermissionRepository>('PermissionRepository', PermissionRepositoryDataBase);
container.registerSingleton<RoleRepository>('RoleRepository', RoleRepositoryDataBase);
container.registerSingleton<UserRoleRepository>('UseRoleRepository', UserRoleRepositoryDataBase);