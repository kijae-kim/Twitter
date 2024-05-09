
import { config } from '../config.js';
import MongoDb from 'mongodb';

let db;
export async function connectDB(){
    return MongoDb.MongoClient.connect(config.db.host).then((client)=> db = client.db());
}
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