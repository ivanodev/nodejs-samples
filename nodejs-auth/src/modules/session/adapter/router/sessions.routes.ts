import { Router } from "express";
import SessionsController from "../controller/sessions.controller";

const sessionsRouter = Router();
const sessionsController: SessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create );

export default sessionsRouter;
