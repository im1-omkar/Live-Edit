import express from "express";
import authMiddleware from "../../middlewares/middleware.auth";
import { Documents } from "../../db/schemas";
import controller from "./documents.controller";

const documentsRouter = express.Router();

documentsRouter.get("/",authMiddleware, controller.getData)

documentsRouter.post("/", authMiddleware,controller.createDoc)

documentsRouter.get("/documents/:id",()=>{})

export default documentsRouter
