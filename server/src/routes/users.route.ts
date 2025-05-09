import { Router } from "express";
import validate from "../middleware/validateResource";
import { createUserSchema, updateUserSchema } from "../schema/user.schema";
import { createUserHandler, updateUserHandler } from "../controller/user.controller";
import requireUser from "../middleware/requireUser";

const userRouter = Router();

userRouter.post('/', validate(createUserSchema), createUserHandler);
    
userRouter.put('/', requireUser, validate(updateUserSchema), updateUserHandler);

export default userRouter;