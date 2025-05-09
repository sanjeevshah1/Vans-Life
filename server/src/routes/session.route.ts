
import { Router } from "express";
import validate from "../middleware/validateResource";
import { getSessionHandler, deleteSessionHandler } from "../controller/session.controller";
import requireUser from "../middleware/requireUser";

const sessionRouter = Router();

sessionRouter.get('/', requireUser, getSessionHandler);
sessionRouter.delete('/', requireUser, deleteSessionHandler);

export default sessionRouter;