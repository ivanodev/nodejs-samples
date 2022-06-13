import { Request, Response, NextFunction } from 'express';
import AppError from '@common/errors/app-error';
import { container } from 'tsyringe';
import LoadUserService from '@modules/actor/services/User/LoadUserService';
import User from '@modules/actor/model/User';
import Permission from '@modules/access/model/Permission';

export default function ensurePermission(permissions: string[]) {

  const roleAuthorized = async (
    request: Request,
    response: Response,
    next: NextFunction) => {

    let permissionExists = false;

    try {

      if (!request.user || !request.user.id) {

        return response.status(400).json('Usuário não encontrado');
      }

      const userId = request.user.id;

      const loadUserService = container.resolve(LoadUserService);

      const user: User | undefined = await loadUserService.findById(userId);

      if (user) {
        
        const allUserRolePermissions: Permission[] = [];

        for (const role of  user.roles) {

          for (const permission of role.permissions) {

            allUserRolePermissions.push(permission);
          }
          
        }

        permissionExists = allUserRolePermissions.some(permisson => permissions.includes(permisson.name));
      }

      if (permissionExists) {

        return next();
      } else {

        return response.status(401).json('Você não tem privilégio de acesso a esta funcionalidade');
      }

    } catch (err) {

      throw new AppError('Você não tem privilégio de acesso a esta funcionalidade.', 401);
    }
  }

  return roleAuthorized;
}