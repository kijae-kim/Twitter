import express from "express";

const router = express.Router();

let tweets = [
    {
        id: '1',
        test: 'Hola',
        createdAt: Date.now().toString(),
        name: 'Mikel',
        username: 'Mikel',
        url: 'data:image/jpeg;base64,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'
    },
    {
        id: '2',
        test: 'Hola',
        createdAt: Date.now().toString(),
        name: 'Odegaard',
        username: 'Martin',
        url: 'data:image/jpeg;base64,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'
    }
];





// 해당 아이디에 대한 트윗 가져오기
// Get 방식
// http://localhost:8080/tweets?username=:username
// .query()
// .params()
// .body()
router.get('/',(req,res,next)=>{
    const username = req.query.username; //http~~~ 주소를 받아오고 .query (?이후의 쿼리문)에서 username을 받아온다.
    const data = username   // usernameㅔ
    ? tweets.filter((tweet)=>tweet.username == username)
    : tweets;
    res.status(200).json(data);
});



// 글번호에 대한 트윗 가져오기
// Get
// http://localhost:8080/tweets/:id
// .find()
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    const tweet = tweet.find((tweet)=> tweet.id === id);
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message:`${id}의 트윗이 없습니다.`});
    }
})

// 트윗하기(글쓰기)
// Post
// http://localhost:8080/tweets
// name, username, text을 등록받아 글을 입력할 수 있게 만들어주자.
// json형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.post('/',(req,res,next)=>{
    const {text,name,username} = req.body;
    const tweet = {
        id: '10',
        text: text,
        createdAt: Date.now().toString(),
        name: name,
        username:username,
        url: ''
    };
    tweets = [tweet, ... tweets];
    res.status(201).json(tweets);
});


// 트윗수정하기(글수정)
// Put
// http://localhost:8080/tweets/:id
// id, username, text
// json 형태로 입력 후 변경된 데이터까지 모두 json으로 출력
router.put('/:id',(req,res,next)=>{
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find((tweet)=>tweet.id === id);
    if(tweet){
        tweet.text = test;
        res.status(201).json(tweet);
    }else{
        res.status(404).json({message:`${id}의 트윗이 없습니다.`});
    }
});



// 트윗삭제하기(글삭제)
// Delete
// http://localhost:8080/tweets/:id
// id
router.delete('/:id',(req,res,next)=>{
    const id = req.params.id;
    tweet_temp = tweets.filter((tweet)=> tweet.id !==id);
    res.status(204).json(tweets);
});



export default router;