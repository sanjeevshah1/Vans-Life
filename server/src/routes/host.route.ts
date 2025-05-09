import { Router } from "express";
const hostRouter = Router();
import requireUser from "../middleware/requireUser";
import { requireRole } from "../middleware/requireRole";
import { getUserHandler , deleteUserHandler } from "../controller/user.controller";
import validate from "../middleware/validateResource";
import { deleteUserSchema } from "../schema/user.schema";
import vansRouter from "./vans.route";

hostRouter.get('/', requireUser, requireRole(['host']), getUserHandler);
hostRouter.delete('/:id', requireUser, requireRole(['host']), validate(deleteUserSchema), deleteUserHandler);
hostRouter.use('/vans', requireRole(['host']), vansRouter);

export default hostRouter;