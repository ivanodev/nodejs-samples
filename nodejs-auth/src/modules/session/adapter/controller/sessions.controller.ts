import AuthenticateUserService from '@modules/session/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {

  public async create(request: Request, response: Response): Promise<Response> {

    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password
    });

    const roleRefs = user.roles.map(role => {

      if (role.isActive) {

        return {
          id: role.id,
          name: role.name,
          description: role.description,
          permissions: role.permissions?.map(permission => permission.name)
        }
      }
    });


    const lastName = user.lastName ? ' ' + user.lastName : '';

    const userRef = {
      id: user.id,
      name: `${user.firstName}${lastName}`,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      roles: roleRefs
    }

    return response.json({ user: userRef, token });
  }
}