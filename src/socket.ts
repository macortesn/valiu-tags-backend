import socketIO from "socket.io";
import { Server } from "http";

let io: any;
let socket: any;

export const connect = (server: Server) => {
    io = socketIO(server);

    io.on("connection", (newSocket: any) => {
        socket = newSocket
        console.log(`New client is connected and its id is ${newSocket.id}`)
    })
}

export const getIo = () => {
    return io;
}

export const getSocket = () => {
    return socket;
}
