import { Request, Response, NextFunction } from "express"
import { DecodedUser, UserDocument } from "../types";


const requireUser = async (req: Request, res: Response, next: NextFunction) => {
   console.log("requireUser is executing")
   const user: DecodedUser = res.locals.user;
   if(!user) res.sendStatus(403);
next()
}
export default requireUser;