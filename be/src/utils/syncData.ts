import { Documents } from "../db/schemas"
import { data} from "../webSocket/roomManager";

export const syncData = async ()=>{
    try{
        const result = await Documents.find();

        for(const obj of result){
            data[obj._id.toString()] = obj.content;
        }

        console.log("data sync successfully")
    }
    catch(err){
        console.log("error while syncing the data : " + err)
    }
}

