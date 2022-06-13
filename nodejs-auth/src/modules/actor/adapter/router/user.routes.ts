import ensureAthenticated from '@common/infra/http/middlewares/ensure-authenticated';
import { Router } from 'express';
import ActorController from '../controller/ActorController';
import UserController from '../controller/UserController';

const userRouter = Router();
const userController = new UserController();
const actorController = new ActorController();

userRouter.post( '/new-users/update-perfil', actorController.save );

userRouter.use(ensureAthenticated);

userRouter.post( '/', userController.create );
userRouter.put( '/', userController.update );
userRouter.get( '/', userController.find );
userRouter.get( '/filter', userController.filter );
userRouter.get( '/emails/:email', userController.findByEmail );
userRouter.get( '/:userId', userController.findById );
userRouter.delete( '/:userId', userController.delete );

export default userRouter;