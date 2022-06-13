import { Router } from 'express';
import RequestUserAccessController from '../controller/RequestUserAccessController';

const requestUserAccessRouter = Router();
const requestUserAccessController = new RequestUserAccessController();

requestUserAccessRouter.post( '/request-random-access', requestUserAccessController.requestRandomUserAccess );

export default requestUserAccessRouter;