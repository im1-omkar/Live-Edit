import {WebSocketServer} from "ws"
import { data, rooms } from "./roomManager"
import { Documents } from "../db/schemas"

const initWebSocket = async(httpServer:any)=>{

    try{

        const wss = new WebSocketServer({"server":httpServer})

        wss.on("connection",(ws:any)=>{

            ws.on("error", (error:any)=>{console.log("error occur : " + error)})

            ws.on("message",async(mssg:any)=>{
                let mssg1
                try{
                    mssg1 = JSON.parse(mssg.toString())
                }catch{
                    console.log("error while formating to JSON")
                    return
                }
                /**join */
                if(mssg1.type == "join"){
                    console.log("client joined the editor page");
                    const roomId = mssg1.docId;
                    ws.roomId = roomId;
                    if(!rooms[roomId]){
                        rooms[roomId] = new Set();
                    }

                    rooms[roomId].add(ws)

                    ws.send(JSON.stringify({
                        room: rooms[roomId].size,   /**send count insted */
                        content:data[roomId]
                    }))

                    const currRoom = rooms[roomId];
                    for(const client of currRoom){
                        client.send(JSON.stringify({
                            type:"sync-contact",
                            room: rooms[roomId].size
                        }))
                    }
                }

                /**edit */
                if(mssg1.type == "edit"){
                    console.log("edit made")
                    const roomId = ws.roomId
                    try{
                        const doc = await Documents.updateOne({"_id":roomId},{"content":mssg1.content});
                    }
                    catch(err){
                        console.log("error while making entry to db : " + err)
                    }
                    data[roomId] = (mssg1.content)

                    const currRoom = rooms[roomId];
                    for(const client of currRoom){
                        client.send(JSON.stringify({
                            type:"sync-content",
                            content: mssg1.content
                        }))
                    }
                }
            })

            ws.on("close",()=>{
                /**sync-contacts */
                const roomId = ws.roomId;
                if(roomId == null){
                    console.log("client left the room");
                    return;
                }
                if(roomId && rooms[roomId]){
                    rooms[roomId].delete(ws)
                }

                if(rooms[roomId].size == 0){
                    delete rooms[roomId];
                    return;
                }

                const currRoom = rooms[roomId];
                for(const client of currRoom){
                    client.send(JSON.stringify({
                        type: "sync-contact",
                        room:rooms[roomId].size /**send count insted */
                    }))
                }

            })

            ws.send("Hello from server!");

        })

    }
    catch(err){
        console.log("INTERNAL_SERVER_ERROR : " + err);
    }

}

export default initWebSocket
