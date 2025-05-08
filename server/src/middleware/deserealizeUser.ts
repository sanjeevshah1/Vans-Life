import { Request, Response, NextFunction } from "express"
import { get } from "lodash"
import {verifyJwt} from "../utils/jwt.utils"
import { UserDocument } from "../types";
import { reIssueAccessToken } from "../service/session.service";


export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
        const refreshToken = get(req, "headers.x-refresh")
        console.log("The refresh Token is", refreshToken)
    if(!accessToken) {
        return next();
    }
    const {expired, decoded} = verifyJwt(accessToken)
    if(decoded){
        console.log("the decoded user is",decoded._id)
        res.locals.user = decoded;
        return next();
    }
    if(expired && refreshToken){
        const newAccessToken = await reIssueAccessToken(refreshToken as string)
       if(newAccessToken) {
        console.log("The new access token is",newAccessToken)
            res.setHeader("x-access-token", newAccessToken)
            const result = verifyJwt(newAccessToken);
            if(result.decoded){
                res.locals.user = result.decoded;
            }
        return next();
       }

    }

    return next()
    }catch(error : unknown){
        res.status(500).json(error instanceof Error ? error.message : "Something went wrong");
    }
}