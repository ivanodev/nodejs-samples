import ensureAthenticated from '@common/infra/http/middlewares/ensure-authenticated';
import ensurePermission from '@common/infra/http/middlewares/ensure-permission';
import { Router } from 'express';
import RoleController from '../controller/RoleController';

const roleRouter = Router();
const roleController = new RoleController();

roleRouter.use(ensureAthenticated);

roleRouter.post( '/', ensurePermission(['CREATE_ROLE']), roleController.create );
roleRouter.put( '/', ensurePermission(['EDIT_ROLE']), roleController.update );
roleRouter.get( '/', ensurePermission(['FIND_ROLE']), roleController.find );
roleRouter.get( '/filter', ensurePermission(['FIND_ROLE']), roleController.filter );
roleRouter.get( '/:roleId', ensurePermission(['FIND_ROLE']), roleController.findById );
roleRouter.delete( '/:roleId', ensurePermission(['CREATE_DELETE']), roleController.delete );

export default roleRouter;

