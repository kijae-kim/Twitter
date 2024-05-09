import express from "express";
import morgan from "morgan";
import tweetsRouter from './Router/tweets.js';
import authRouter from './Router/auth.js';
import { config } from "./config.js";
// import { sequelize } from "./DB/database.js";
import { connectDB } from "./DB/database.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// http://localhost:8080/tweets
app.use('/tweets', tweetsRouter);
app.use('/auth',authRouter);


app.use((req,res, next)=>{
    res.sendStatus(404);
});

// DB 연결 테스트!
connectDB().then((db)=>{
    console.log('MongoDB Connetction Success')
    app.listen(config.host.port);
}).catch(console.error);

// sequelize.sync().then(()=>{
//     app.listen(donfig.host.port);
// });

