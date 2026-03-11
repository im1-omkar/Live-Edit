import connectDB from "./db/connectDB";
import app from "./server";
import { WebSocketServer } from "ws";
import initWebSocket from "./webSocket/webSocket";

const PORT = process.env.PORT

connectDB()

const httpServer = app.listen(PORT, ()=>{
    console.log("app is running on PORT : "+PORT);
})

/**-----------web-socket------------- */

initWebSocket(httpServer)

// const wss = new WebSocketServer({server: httpServer});

// wss.on("connection", (ws)=>{
//     ws.on("error",(err)=>{console.log(err)})

//     ws.on("message",(message, isBinary)=>{
//         wss.clients.forEach((client)=>{
//             client.send(message)
//         })
//     })

//     ws.send("welcome to server!")
// })
