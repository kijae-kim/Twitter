// let tweets = [
//     {
//         id: '1',
//         test: 'Hola',
//         createdAt: Date.now().toString(),
//         name: 'Mikel',
//         username: 'Mikel',
//         url: './Arteta.jpeg'
//     },
//     {
//         id: '2',
//         test: 'Hola',
//         createdAt: Date.now().toString(),
//         name: 'Odegaard',
//         username: 'Martin',
//         url: './Odegaard.jpeg'
//     }
// ];
import {db} from '../DB/database.js';
const SELECT_JOIN = 'selsect tw.id, tw.text, tw.createdAt, tw.userId, us.uername, us.name, use.email, us.url from as tw join users as us on tw.userid = us.id';

const ORDER_DESC = 'order by tw.createAt desc';


// 모든 트윗을 리턴
export async function getAll() {
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result)=>{
        console.log(result);
        return result;
    });
}

// 해당 아이디에 대한 트윗을 리턴
export async function getAllByUsername(username){
    return db.execute(`${SELECT_JOIN} where username = ? ${ORDER_DESC}`, [username]).then((result)=>{
        console.log(result);
        return result;
    });
}

// 글번호에 대한 트윗을 리턴
export async function getById(id){
    return db.execute(`${SELECT_JOIN} where tw.id = ? ${ORDER_DESC}`,[id]).then((result)=>{
        console.log(result);
        return result;
    });
}

// 트윗을 작성
export async function create(text, userId){
    return db.execute('insert into tweets (text,userId) values(?,?)', [text, userId]).
    then((result)=>{
        console.log(result);
        return result([0].insertId);
    });
}

// 트윗을 변경
export async function update(id, text){
    return db.execute('update tweets set text = ? where id = ?',[text,id]).then((result)=>{
        console.log(result);
        return getById(result[0].insertId);
    });
}

// 트윗을 삭제
export async function remove(id){
    return db.execute('delete from tweets where id =?',[id]);
}