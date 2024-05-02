let tweets = [
    {
        id: '1',
        test: 'Hola',
        createdAt: Date.now().toString(),
        name: 'Mikel',
        username: 'Mikel',
        url: './Arteta.jpeg'
    },
    {
        id: '2',
        test: 'Hola',
        createdAt: Date.now().toString(),
        name: 'Odegaard',
        username: 'Martin',
        url: './Odegaard.jpeg'
    }
];

// 모든 트윗을 리턴
export async function getAll() {
    return tweets;
}
// 해당 아이디에 대한 트윗을 리턴
export async function getAllByUsername(username){
    return tweets.filter((tweet) => tweet.username === username)
}
// 글번호에 대한 트윗을 리턴
export async function getById(id){
    return tweets.find((tweet)=>tweet.id===id)
}
// 트윗을 작성
export async function create(text, name, username){
    const tweet = {
        id:'10',
        text:text,
        createdAt: Date.now().toString(),
        name: name,     // 객체를 만들 때 키값과 변수값이 같으면 text처럼 한번만 써도됨.
        username: username
    };
    tweets = [tweet, ...tweets];
    return tweets;
}
// 트윗을 변경
export async function update(id, text){
    const tweet = tweets.find((tweet)=>tweet.id === id);
    if (tweet){
        tweet.text = text;
    }
    return tweet;
}
// 트윗을 삭제
export async function remove(id){
    tweets = tweets.filter((tweet)=> tweet.id !== id);
}