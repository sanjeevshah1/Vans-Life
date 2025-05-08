import jwt from 'jsonwebtoken';
import config from "config";
import { DecodedUser } from '../types';




//sign in private key
export function signinJwt(object : Object, options?: jwt.SignOptions | undefined) : string {
    const privateKey = config.get<string>("privateKey");
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: "RS256"
    })
}

//verify with public key    
export function verifyJwt(token : string) : {valid : boolean, decoded : DecodedUser | null, expired : boolean} {
    console.log("verify is executing")
    const publicKey = config.get<string>("publicKey");
    try{
        const decoded= jwt.verify(token, publicKey);
        return {
            valid : true,
            decoded: decoded as DecodedUser,
            expired : false
        }

    }catch(error : any){ 
        console.log("the error is",error.message)
        return {
            valid : false,
            decoded : null,
            expired : error.message === "jwt expired"
        }

    }

}