import {Express} from "express";
import { getUserHandler, createUserHandler, deleteUserHandler, updateUserHandler } from "../controller/user.controller";
import validate from "../middleware/validateResource";
import { createUserSchema, deleteUserSchema, updateUserSchema } from "../schema/user.schema";
import { createSessionSchema} from "../schema/session.schema";
import { createUserSessionHandler, getSessionHandler, deleteSessionHandler, logoutHandler } from "../controller/session.controller";
import requireUser from "../middleware/requireUser";
import { requireRole } from "../middleware/requireRole";

const routes = (app: Express) => {
    // Public routes

    app.get('/api/hello', (req,res) =>{
        res.send("Hello world");
    })
    app.post('/api/login', validate(createSessionSchema), createUserSessionHandler);
    app.post('/api/logout', logoutHandler);
    
    // Protected routes
    app.get('/api/users', requireUser, requireRole(['host']), getUserHandler);
    app.post('/api/users', validate(createUserSchema), createUserHandler);
    app.delete('/api/users', requireUser, requireRole(['host']), validate(deleteUserSchema), deleteUserHandler);
    app.put('/api/users', requireUser, validate(updateUserSchema), updateUserHandler);
    
    // Session routes
    app.get('/api/sessions', requireUser, getSessionHandler);
    app.delete('/api/sessions', requireUser, deleteSessionHandler);
}

export default routes;