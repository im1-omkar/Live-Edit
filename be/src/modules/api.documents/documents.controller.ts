import express from "express";
import { Documents } from "../../db/schemas";
import responses from "../../utils/responsese";

const createDoc = async (req:express.Request, res:express.Response)=>{

    const title = req.body.title;

    try{
        const doc = await Documents.create({
            "title":title,
            "content": ""
        })

        console.log(doc);

        const data = await Documents.find();

        res.json(responses.success(data));
        return;

    }
    catch(err){
        console.log("error while creating doc : " + err)
        res.json(responses.error("INTERNAL_SERVER_ERROR"));
    }

}

const getData = async (req:express.Request, res:express.Response)=>{
    try{
        const data = await Documents.find();

        res.json(responses.success(data));
        return;
    }
    catch(err){
        console.log("error while getting the docs : "+err);
        res.json(responses.error("INTERNAL_SERVER_ERROR"));
    }
}

const controller = {
    "createDoc":createDoc,
    "getData":getData
}

export default controller