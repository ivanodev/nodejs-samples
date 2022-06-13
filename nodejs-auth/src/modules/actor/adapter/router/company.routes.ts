import ensureAthenticated from '@common/infra/http/middlewares/ensure-authenticated';
import { Router } from 'express';
import CompanyController from '../controller/CompanyController';

const companyRouter = Router();
const companyController = new CompanyController();

companyRouter.use(ensureAthenticated);

companyRouter.post( '/', companyController.create );
companyRouter.put( '/', companyController.update );
companyRouter.get( '/', companyController.find );
companyRouter.get( '/filter', companyController.filter );
companyRouter.get( '/:companyId', companyController.findById );
companyRouter.delete( '/:companyId', companyController.delete );

export default companyRouter;