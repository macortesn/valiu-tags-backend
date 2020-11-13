require('dotenv').config()

import database from "./src/database";
import app from "./src/server";
import { createServer } from "http";
import { connect as connectSocket } from "./src/socket";


const http = createServer(app);
connectSocket(http);

database.connect()
    .then(() => {
        console.log("DB is connected")
    })
    .catch(err => {
        console.log("DB connection failed", err)
    });

http.listen(app.get("PORT"), () => {
    console.log(`Server is running in port ${app.get("PORT")}`)
})