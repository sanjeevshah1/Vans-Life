import { Router } from "express";
import validate from "../middleware/validateResource";
import { addVanSchema, getVanSchema, deleteVanSchema } from "../schema/van.schema";
import { addVanController, getVansController,getHostVansController, getVanController, deleteVanController } from "../controller/van.controller";

const vansRouter = Router();

vansRouter.post('/', validate(addVanSchema), addVanController);
vansRouter.get('/', getVansController);
vansRouter.get('/', getHostVansController);
vansRouter.get('/:id', validate(getVanSchema), getVanController);
vansRouter.delete('/:id', validate(deleteVanSchema), deleteVanController);

export default vansRouter;``