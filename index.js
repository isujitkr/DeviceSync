import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;


const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket)=>{
    socket.on("send-location", (data)=>{
        io.emit("receive-location", {id: socket.id, ...data})
    });
    
    socket.on("disconnect", ()=>{
        io.emit("user-disconnected", socket.id);
    })
    console.log("Connected");
})

app.get('/',(req,res)=>{
    res.render("index");
});


server.listen(port,()=>{
    console.log(`Serving listening on http://localhost:${port}`);
})
