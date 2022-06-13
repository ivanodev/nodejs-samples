import ensureAthenticated from '@common/infra/http/middlewares/ensure-authenticated';
import { Router } from 'express';
import ActorController from '../controller/ActorController';

const actorRouter = Router();
const actorController = new ActorController();

actorRouter.use(ensureAthenticated);
actorRouter.post('/', actorController.save);
actorRouter.put('/', actorController.save);
actorRouter.get('/', actorController.find);
actorRouter.get('/emails/:email', actorController.findByEmail);
actorRouter.get('/:actorId', actorController.findById);


export default actorRouter;

