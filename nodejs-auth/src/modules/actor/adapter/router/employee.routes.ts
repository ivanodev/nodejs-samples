import ensureAthenticated from '@common/infra/http/middlewares/ensure-authenticated';
import { Router } from 'express';
import EmployeeController from '../controller/EmployeeController';

const employeeRouter = Router();
const employeeController = new EmployeeController();

employeeRouter.use(ensureAthenticated);

employeeRouter.post( '/', employeeController.create );
employeeRouter.put( '/', employeeController.update );
employeeRouter.get( '/', employeeController.find );
employeeRouter.get( '/filter', employeeController.filter );
employeeRouter.get( '/findByCompany', employeeController.findByCompany );
employeeRouter.get( '/emails/:email', employeeController.findByEmail );
employeeRouter.get( '/:employeeId', employeeController.findById );
employeeRouter.delete( '/:employeeId', employeeController.delete );

export default employeeRouter;