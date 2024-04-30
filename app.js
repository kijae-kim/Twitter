import express from "express";
import morgan from "morgan";
import tweetsRouter from './Router/tweets.js';
import authRouter from './Router/auth.js';

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// http://localhost:8080/tweets
app.use('/tweets', tweetsRouter);
app.use('/auth',authRouter);



app.use((req,res, next)=>{
    res.sendStatus(404);
});

app.listen(8080);