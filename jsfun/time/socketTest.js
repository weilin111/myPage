// import { io } from "./socket.io.esm.min.js";


const socket = io("http://localhost:8000");


socket.on("connect",
    e => {
        console.log("1111111")
        socket.emit("my custom event", "123")
    })

socket.on("from server",
    e => {
        console.log("from server")
        console.log(e)
        socket.emit("my custom event", "recived")
        game.timeWorld.player.body.position.x += 50

    })

socket.emit("test", "123")



console.log(socket)