import { Router } from "express";
import validate from "../middleware/validateResource";
import { addVanSchema, getVanSchema, deleteVanSchema, updateVanSchema } from "../schema/van.schema";
import { addVanController, getHostVansController, getVanController, deleteVanController, updateVanController } from "../controller/van.controller";

const vansRouter = Router();

vansRouter.post('/', validate(addVanSchema), addVanController);
vansRouter.get('/', getHostVansController);
vansRouter.get('/:id', validate(getVanSchema), getVanController);
vansRouter.patch('/:id', validate(updateVanSchema), updateVanController);
vansRouter.delete('/:id', validate(deleteVanSchema), deleteVanController);

export default vansRouter;``