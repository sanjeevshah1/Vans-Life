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
    app.post('/api/login', validate(createSessionSchema), createUserSessionHandler);
    // @route POST /api/login
    // @desc login user
    // @access Registered User

    app.post('/api/logout', logoutHandler);
     // @route POST /api/logout
    // @desc logout user
    // @access Logged In User
    
    
    // Protected routes
    app.use('/api/host',hostRouter);
     // @route /api/host/......
    // @desc host routes
    // @access host

    app.use('/api/users',userRouter);
     // @route /api/users/....
    // @desc users routes
    // @access users

    // Session routes
    app.use('/api/sessions',sessionRouter)

    app.get('/api/vans', getVansController);


}
export default router;