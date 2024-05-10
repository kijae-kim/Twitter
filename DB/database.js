
import { config } from '../config.js';
import Mongoose from 'mongoose';


export async function connectDB(){
    return Mongoose.connect(config.db.host);
}
export function useVirtualId(schema){
    schema.virtual('id').get(function(){
        return this._id.toString();
    });
    schema.set('toJSN', {virtuals:true}); //통신
    schema.set('toObject', {virtuals:true});    //객체 사용
}
// mongoose를 사용하는 이유는 스키마를 생성할 수 있다는 이유.
// MongoDB에 스키마적용이 가능.
let db;
//  ODM??
export function getUsers(){
    return db.collection('users');  //데이터를 collection users에 넣겠다.
}

export function getTweets(){
    return db.collection('tweets');
}


// const { host, user, database, password, port } = config.db;

// //ORM??

// export const sequelize = new SQ.Sequelize(database, user, password, {
//     host,
//     dialect: 'mysql',
//     logging: false
// })