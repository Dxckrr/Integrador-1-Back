import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';

interface Payload {
    _id: number;
    iat : number;
    exp : number;
}

/**
 * Validtes a jwt
 * @param req 
 * @param res 
 * @param next
 * @returns access token to next function
 */
export const TokenValidator = (req: Request , res: Response, next: NextFunction) =>{
    const token = req.header('auth-token');
    if (!token) return res.status(401).json('Acceso denegado.');
    //get datos del token
    const payload = jwt.verify(token, process.env.TOKEN_SECRET ||' ') as Payload;
    console.log("payload",payload)
    req.CC = payload._id;
    console.log("req =>",req.CC)
    next()
}