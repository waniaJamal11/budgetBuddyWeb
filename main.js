import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
import router from "./routes/userRoutes.js"; 
import config from "./middlewares/configMiddleware.js";

function startServer() {
    config(app, express);
    app.use(router);
    app.listen(PORT, function(){
        console.log(`The server is running at http://localhost:${PORT}`);
    })
}
startServer();
