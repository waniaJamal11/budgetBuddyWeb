import express from "express";
import dotenv from "dotenv";
import config from "./middlewares/configMiddleware.js";
import connectDB from "./configDB/db.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const url = process.env.DATABASE;
const secretKey = process.env.SECRET_KEY;

function startServer() {
    connectDB(url);
    config(app, express, secretKey);
    app.listen(PORT, function () {
        console.log(`The server is running at http://localhost:${PORT}`);
    })
}
startServer();
