import mongoose from "mongoose";
import config from "./config";

const connect = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await mongoose.connect(config.MONGODB.URI, {
                useNewUrlParser: true, useUnifiedTopology: true
            })
            resolve();
        }
        catch (err) {
            reject(err);
        }
    })
}

const drop = () => {
    return new Promise((resolve, reject) => {
        mongoose.connection.db.dropDatabase(function (err, result) {
            if (err) return reject();
            resolve();
        })
    })
}

const close = () => {
    return mongoose.disconnect();
}

export default {
    connect,
    drop,
    close
}