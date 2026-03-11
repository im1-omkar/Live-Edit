import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    "userName":{"type":String, unique:true, require:true},
    "email":{"type":String, unique:true, require:true},
    "password":{"type":String, require:true}
})

export type Users = mongoose.InferSchemaType<typeof userSchema> 
export const Users =  mongoose.model("User",userSchema);

const documentSchema = new mongoose.Schema({
    "title" : {"type": String, require: true},
    "content": {"type":String, require:true}
})

export type Documents = mongoose.InferSchemaType<typeof documentSchema>
export const Documents = mongoose.model("Documents", documentSchema)