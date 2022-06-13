import ensureAthenticated from '@common/infra/http/middlewares/ensure-authenticated';
import { Router } from 'express';
import ProfessionalProfileController from '../controller/ProfissionalProfileController';

const professionalProfileRouter = Router();
const professionalProfileController = new ProfessionalProfileController();

professionalProfileRouter.use(ensureAthenticated);

professionalProfileRouter.post( '/', professionalProfileController.create );
professionalProfileRouter.put( '/', professionalProfileController.update );
professionalProfileRouter.get( '/', professionalProfileController.find );
professionalProfileRouter.get( '/filter', professionalProfileController.filter );
professionalProfileRouter.get( '/:professionalProfileId', professionalProfileController.findById );
professionalProfileRouter.delete( '/:professionalProfileId', professionalProfileController.delete );

export default professionalProfileRouter;