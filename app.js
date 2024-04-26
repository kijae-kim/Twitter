import express from "express";
import morgan from "morgan";
import tweetsRouter from './Router/tweets.js';

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// http://localhost:8080/tweets
app.use('/tweets', tweetsRouter);

//해당 아이디에 대한 트윗 가져오기



//해당 글번호에 대한 트윗 가져오기

//글쓰기

//글수정

//글삭제


app.use((req,res, next)=>{
    res.sendStatus(404);
});

app.listen(8080);