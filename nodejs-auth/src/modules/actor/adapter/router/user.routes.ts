import ensureAthenticated from '@common/infra/http/middlewares/ensure-authenticated';
import ensurePermission from '@common/infra/http/middlewares/ensure-permission';
import { Router } from 'express';
import ActorController from '../controller/ActorController';
import UserController from '../controller/UserController';

const userRouter = Router();
const userController = new UserController();
const actorController = new ActorController();

userRouter.post( '/new-users/update-perfil', actorController.save );

userRouter.use(ensureAthenticated);

userRouter.post( '/', ensurePermission(['CREATE_USER']), userController.create );
userRouter.put( '/', ensurePermission(['EDIT_USER']), userController.update );
userRouter.get( '/', ensurePermission(['FIND_USER']), userController.find );
userRouter.get( '/filter', ensurePermission(['FIND_USER']),userController.filter );
userRouter.get( '/emails/:email', ensurePermission(['FIND_USER']), userController.findByEmail );
userRouter.get( '/:userId', ensurePermission(['FIND_USER']), userController.findById );
userRouter.delete( '/:userId', ensurePermission(['DELETE_USER']), userController.delete );

export default userRouter;