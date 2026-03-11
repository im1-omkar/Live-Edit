/**
 * 1. complete the signin endpoint
 * 2. complete the auth - middleware
 * 3. start with /api/documents -> 3 of the endpoint
 * 4. 
 */
import express, { response } from "express";
import responses from "../utils/responsese";
import jwt from "jsonwebtoken";

const authMiddleware = async (req:express.Request, res:express.Response, next:express.NextFunction)=>{

    const bearer:any = req.headers.authorization

    if(bearer == null){
        res.json(responses.error("TOKEN_IS_NOT_PRESENT"))
        return;
    }

    const token = bearer.split(" ")[1]

    if(!token){
        res.status(401).json(responses.error("UNAUTHORIZED"))
        return
    }

    try{

        const decoded:any = await jwt.verify(token,process.env.JSON_SECRET!)

        const userName = decoded.userName;
        const userEmail = decoded.email;

        (req as any).userName = userName;
        (req as any).email = userEmail;

        next()

    }
    catch(err:any){

        if(err.name == "JsonWebTokenError" ){
            res.json(responses.error("INVALID_TOKEN"))
            return
        }

        console.log(err)
        res.json(responses.error("INTERNAL_SERVER_ERROR"));
    }

}

export default authMiddleware