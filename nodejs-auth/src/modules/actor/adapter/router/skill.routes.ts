import ensureAthenticated from '@common/infra/http/middlewares/ensure-authenticated';
import { Router } from 'express';
import SkillController from '../controller/SkillController';

const skillRouter = Router();
const skillController = new SkillController();

skillRouter.use(ensureAthenticated);

skillRouter.post( '/', skillController.create );
skillRouter.put( '/', skillController.update );
skillRouter.get( '/', skillController.find );
skillRouter.get( '/filter', skillController.filter );
skillRouter.get( '/:skillId', skillController.findById );
skillRouter.delete( '/:skillId', skillController.delete );

export default skillRouter;