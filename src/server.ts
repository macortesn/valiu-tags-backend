import express from "express";
import path from 'path';
import cors from "cors";
import routes from "./routes";

import config from "./config";

const app = express();


app.set("PORT", config.PORT);

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')))

// MIDDLEWARE API
app.use("/api", routes)

// HANDLE ERRORS
app.use((err: any, req: any, res: any, next: any) => {
    res.status(400).json({
        status: 400,
        message: err.message,
        data: null
    })
})



export default app;