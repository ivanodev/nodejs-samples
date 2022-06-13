import ensureAthenticated from '@common/infra/http/middlewares/ensure-authenticated';
import ensurePermission from '@common/infra/http/middlewares/ensure-permission';
import { Router } from 'express';
import PermissionController from '../controller/PermissionController';

const permissionRouter = Router();
const permissionController = new PermissionController();

permissionRouter.use(ensureAthenticated);

permissionRouter.post( '/', ensurePermission(['CREATE_PERMISSION']), permissionController.create );
permissionRouter.put( '/', ensurePermission(['EDIT_PERMISSION']), permissionController.update );
permissionRouter.get( '/', ensurePermission(['FIND_PERMISSION']), permissionController.find );
permissionRouter.get( '/filter', ensurePermission(['FIND_PERMISSION']), permissionController.filter );
permissionRouter.get( '/:permissionId', ensurePermission(['FIND_PERMISSION']), permissionController.findById );
permissionRouter.delete( '/:permissionId', ensurePermission(['DELETE_PERMISSION']), permissionController.delete );

export default permissionRouter;

