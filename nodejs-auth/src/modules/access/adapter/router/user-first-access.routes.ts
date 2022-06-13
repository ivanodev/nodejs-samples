import ensureAthenticated from '@common/infra/http/middlewares/ensure-authenticated';
import { Router } from 'express';
import UserFirstAccessController from '../controller/UserFirstAccessController';


const userFirstAccessRoute = Router();
const userFirstAccessController = new UserFirstAccessController();

userFirstAccessRoute.post( '/request-first-access', userFirstAccessController.requestUserFirstAccess );
userFirstAccessRoute.post( '/validate-first-access-token', userFirstAccessController.validateUserFirstAccessToken );
userFirstAccessRoute.post( '/first-access-enable', [ensureAthenticated], userFirstAccessController.userFirstAccessEnable );
userFirstAccessRoute.put( '/update-perfil', userFirstAccessController.updatePerfil );


userFirstAccessRoute.get( '/users/:userId', userFirstAccessController.findById );

export default userFirstAccessRoute;