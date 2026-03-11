import express from "express";
import { Users } from "../../db/schemas";
import responses from "../../utils/responsese";
import jwt from "jsonwebtoken";

const signup = async(req:express.Request, res:express.Response)=>{

    //take out parameters --> they are already validated
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    try{
        const user = await Users.findOne({"email":email})

        if(user != null){ //if error
            res.json(responses.error("INVALID_REQUEST"))
            return;
        }

        //hash the password

        const response = await Users.create({
            "userName":userName,
            "email" : email,
            "password": password
        })

        console.log(response)

        //return the response with id -->
        res.json(responses.success({
            "userName":response.userName,
            "email":response.email
        }))

    }
    catch(err){
        console.log("error while signing-up" + err),
        res.json(responses.error("INTERNAL_SERVER_ERROR"))
    }


}

const signin = async(req:express.Request, res:express.Response)=>{

    const email = req.body.email;
    const password = req.body.password;
    
    try{
        console.log("received")
        //get the user with given email
        const user:any = await Users.findOne({"email":email})

        if(user == null){
            res.json(responses.error("EMAIL_NOT_FOUND"))
            return
        }


        //compare the hash password with the given password
        if(password != user.password){
            res.json(responses.error("INVALID_PASSWORD"))
        }


        //generate JWT TOKEN -->  return the token
        const token = jwt.sign({"userName":user.userName, "email":user.email},process.env.JSON_SECRET!)

        res.json({
            "userName":user.userName,
            "email":email,
            "token":token
        })
    }
    catch(err){
        res.json(responses.error("INTERNAL_SERVER_ERROR"))  
        console.log("error while signing-in : " + err)
        return;
    }

    
}

const authController = {
    "signup": signup,
    "signin": signin
}

export default authController;
