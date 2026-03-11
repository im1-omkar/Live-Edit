import express from "express";
import authRouter from "./modules/api.auth/auth.routes";
import documentsRouter from "./modules/api.documents/documents.routes";
import cors from "cors";

const app = express();

app.use(cors())

app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/documents", documentsRouter)

export default app;