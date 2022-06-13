import ensureAthenticated from '@common/infra/http/middlewares/ensure-authenticated';
import { Router } from 'express';
import RoleController from '../controller/RoleController';

const roleRouter = Router();
const roleController = new RoleController();

roleRouter.use(ensureAthenticated);

roleRouter.post( '/', roleController.create );
roleRouter.put( '/', roleController.update );
roleRouter.get( '/', roleController.find );
roleRouter.get( '/filter', roleController.filter );
roleRouter.get( '/:roleId', roleController.findById );
roleRouter.delete( '/:roleId', roleController.delete );

export default roleRouter;

