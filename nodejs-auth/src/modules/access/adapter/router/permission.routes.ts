import ensureAthenticated from '@common/infra/http/middlewares/ensure-authenticated';
import { Router } from 'express';
import PermissionController from '../controller/PermissionController';

const permissionRouter = Router();
const permissionController = new PermissionController();

permissionRouter.use(ensureAthenticated);

permissionRouter.post( '/', permissionController.create );
permissionRouter.put( '/', permissionController.update );
permissionRouter.get( '/', permissionController.find );
permissionRouter.get( '/filter', permissionController.filter );
permissionRouter.get( '/:permissionId', permissionController.findById );
permissionRouter.delete( '/:permissionId', permissionController.delete );

export default permissionRouter;

