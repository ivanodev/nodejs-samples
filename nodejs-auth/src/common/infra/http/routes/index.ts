
import { Router } from 'express';

import actorRouter from '@modules/actor/adapter/router/actor.routes';
import userRouter from '@modules/actor/adapter/router/user.routes';
import sesseionRouter from '@modules/session/adapter/router/sessions.routes';
import permissionRouter from '@modules/access/adapter/router/permission.routes';
import roleRouter from '@modules/access/adapter/router/role.routes';
import requestUserAccessRouter from '@modules/access/adapter/router/request-user-access.routes';
import userPasswordResetRoute from '@modules/access/adapter/router/user-password-reset.routes';
import userFirstAccessRoute from '@modules/access/adapter/router/user-first-access.routes';

const routes = Router();

routes.use('/actors', actorRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sesseionRouter);
routes.use('/roles', roleRouter);
routes.use('/permissions', permissionRouter);
routes.use('/request-access', requestUserAccessRouter);
routes.use('/reset-password', userPasswordResetRoute);
routes.use('/user-first-access', userFirstAccessRoute); 

export default routes;