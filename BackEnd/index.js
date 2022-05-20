const express = require("express")

const { Server } = require("socket.io");
const http = require("http")
const cors = require("cors")


const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods: ["GET","POST"],
    }

});

io.on("connection", (socket) => {
    socket.on("joinroom",room => socket.join(room))

    socket.on("newmsg",({newmsg,room})=>{
        io.in(room).emit("getnewmsg",newmsg)
    })

  });


app.get("/",(req,res)=>{
    res.send("Suvro running")

})

server.listen(8000,()=>{
    console.log(`Listening at 8000`)
})