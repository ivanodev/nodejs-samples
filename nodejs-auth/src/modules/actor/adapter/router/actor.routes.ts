import ensureAthenticated from '@common/infra/http/middlewares/ensure-authenticated';
import ensurePermission from '@common/infra/http/middlewares/ensure-permission';
import { Router } from 'express';
import ActorController from '../controller/ActorController';

const actorRouter = Router();
const actorController = new ActorController();

actorRouter.use(ensureAthenticated);
actorRouter.post('/', ensurePermission(['CREATE_ACTOR']), actorController.save);
actorRouter.put('/', ensurePermission(['EDIT_ACTOR']), actorController.save);
actorRouter.get('/', ensurePermission(['FIND_ACTOR']), actorController.find);
actorRouter.get('/emails/:email', ensurePermission(['FIND_ACTOR']), actorController.findByEmail);
actorRouter.get('/:actorId', ensurePermission(['FIND_ACTOR']), actorController.findById);


export default actorRouter;

