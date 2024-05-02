import express from "express";
import * as tweetController from '../controller/tweet.js';
import { body, validationResult } from "express-validator";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";


const router = express.Router();

/*
        문제
    Post, Put에 text에 대해 빈문자열을 없애고(trim()), 최소 3자 이상 입력해야 데이터를 저장하도록 API에 적용.
*/
const validateTweet = [
    body('text').trim().isLength({min:3}).withMessage('At Least 3words'),validate
]


// 해당 아이디에 대한 트윗 가져오기
router.get('/',isAuth,tweetController.getTweet);

// Get 방식
// http://localhost:8080/tweets?username=:username
// .query()
// .params()
// .body()
// router.get('/',(req,res,next)=>{
//     const username = req.query.username; //http~~~ 주소를 받아오고 .query (?이후의 쿼리문)에서 username을 받아온다.
//     const data = username   // usernameㅔ
//     ? tweets.filter((tweet)=>tweet.username == username)
//     : tweets;
//     res.status(200).json(data);
// });



// 글번호에 대한 트윗 가져오기
// Get
// http://localhost:8080/tweets/:id
// .find()
router.get('/:id',isAuth,tweetController.getTweet);

// 트윗하기(글쓰기)
// Post
// http://localhost:8080/tweets
// name, username, text을 등록받아 글을 입력할 수 있게 만들어주자.
// json형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.post('/',validateTweet,isAuth,tweetController.creatTweet);


// 트윗수정하기(글수정)
// Put
// http://localhost:8080/tweets/:id
// id, username, text
// json 형태로 입력 후 변경된 데이터까지 모두 json으로 출력
router.put('/:id', validateTweet, isAuth,tweetController.updateTweet);



// 트윗삭제하기(글삭제)
// Delete
// http://localhost:8080/tweets/:id
// id
router.delete('/:id',isAuth,tweetController.deleteTweet);



export default router;
