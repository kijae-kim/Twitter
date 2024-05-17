import express from "express";
import morgan from "morgan";
import tweetsRouter from './Router/tweets.js';
import authRouter from './Router/auth.js';
import { config } from "./config.js";
// import { sequelize } from "./DB/database.js";
import { connectDB } from "./DB/database.js";
import {initSocket} from "./connection/socket.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// http://localhost:8080/tweets
app.use('/tweets', tweetsRouter);
app.use('/auth',authRouter);


app.use((req,res, next)=>{
    res.sendStatus(404);
});

connectDB().then((db)=>{
    const server = app.listen(config.host.port);
    initSocket(server);
}).catch(console.error);

// sequelize.sync().then(()=>{
//     app.listen(donfig.host.port);
// });

