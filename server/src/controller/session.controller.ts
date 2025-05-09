import {Request, Response} from "express"
import { createSession, findSessions, updateSession } from "../service/session.service"
import mongoose from "mongoose";
import { validatePassword } from "../service/user.service"
import { createSessionSchemaType } from "../schema/session.schema";
import { signinJwt, verifyJwt } from "../utils/jwt.utils";
import { DecodedUser } from "../types";
export interface UserInput{
    email: string;
    password: string;
    name: string;
}
export interface UserDocument extends UserInput, mongoose.Document {
    createdAt : Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string) : Promise<boolean>;
    role: 'user' | 'host';
}

export async function createUserSessionHandler(req: Request<{},{},createSessionSchemaType["body"]>, res: Response) : Promise<void>{ 
    //1. Validate the user password.
    console.log("The createUserSessionHandler executing");

    const validatedUser = await validatePassword(req.body);
    if(!validatedUser) {
        res.status(401).json({message: "Invalid email or password"});
        return;
    }

    //2. Create the session.
    const user = await validatePassword(req.body);
    if(user === false) res.status(401).json({message: "Invalid email or password"});

   const newUser = user as Omit<UserDocument, "password">
   const {role} = newUser;
   const id = newUser._id as mongoose.Types.ObjectId;
   const stringifiedId = id.toString();
    const session = await createSession(stringifiedId, req.get("user-agent") || "");
    

    //3. Generate access token.
   
    const accessToken = signinJwt({
            ...newUser, session: session._id
        },{
          expiresIn: "1d"  
    });

    const refreshToken = signinJwt({
            ...newUser, session: session._id
        },{
          expiresIn: "30d"  
    });

    //5. Send access token, refresh token, & role in the response
  
    res.status(201).send({
        accessToken,
        refreshToken,
        role
    });
}

export async function getSessionHandler(req: Request, res: Response) : Promise<void>{
    console.log("getSessionHandler executing")
    try{
        console.log("the user in get session handler is", res.locals.user)
        const user = res.locals.user._id;
        const sessions = await findSessions({user: user, valid: true});
        res.status(200).send(sessions);
    }catch(error : unknown){
        res.send(error instanceof Error ? error.message : "Something went wrong in Session Handler");
    }
}

export async function deleteSessionHandler(req: Request, res: Response) : Promise<void>{
    console.log("deleteSessionHandler executing")
    try{
        const sessionId = res.locals.user.session;
        const sessions = await updateSession({session: sessionId},{ valid: false});
        res.status(200).send({
            accessToken : null,
            refreshToken : null
        });
    }catch(error : unknown){
        res.send(error instanceof Error ? error.message : "Something went wrong in Session Handler");
    }
}

export async function logoutHandler(req: Request, res: Response) : Promise<void>{
    
}