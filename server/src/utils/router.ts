import {Express} from "express";
import { getUserHandler, createUserHandler, deleteUserHandler, updateUserHandler } from "../controller/user.controller";
import validate from "../middleware/validateResource";
import { createUserSchema, deleteUserSchema, deleteUserSchema2, updateUserSchema } from "../schema/user.schema";
import { createSessionSchema} from "../schema/session.schema";
import { createUserSessionHandler, getSessionHandler, deleteSessionHandler, logoutHandler } from "../controller/session.controller";
import requireUser from "../middleware/requireUser";
import hostRouter from "../routes/host.route";
import userRouter from "../routes/users.route";
import sessionRouter from "../routes/session.route";
import vansRouter from "../routes/vans.route";
import { getVansController } from "../controller/van.controller";
const router = (app: Express) => {
    // Public routes
    app.post('/api/login', validate(createSessionSchema), createUserSessionHandler);
    app.post('/api/logout', logoutHandler);
    
    // Protected routes
    app.use('/api/host',hostRouter);
    app.use('/api/users',userRouter);

    // Session routes
    app.use('/api/sessions',sessionRouter)
    app.get('/api/vans', getVansController);


}

export default router;