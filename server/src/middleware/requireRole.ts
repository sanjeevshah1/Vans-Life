import { Request, Response, NextFunction } from "express";
import { DecodedUser } from "../types";

export const requireRole = (roles: ('user' | 'host')[]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user: DecodedUser = res.locals.user;
        
        if (!user) {
            res.status(403).json({ message: "Access denied. No user found." });
            return;
        }

        if (!roles.includes(user.role)) {
            res.status(403).json({ 
                message: "Access denied. Insufficient permissions." 
            });
            return;
        }

        next();
    };
}; 