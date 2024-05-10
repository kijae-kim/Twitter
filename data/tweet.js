import Mongoose from 'mongoose';
import { useVirtualId } from '../DB/database.js';
import * as authRepository from './auth.js';

const tweetSchema = new Mongoose.Schema({
    text: {type: String, require: true},
    userId: {type: String, require: true},
    name: { type: String, require: true},
    username: { type: String, require: true},
    url: String
},{timestamps: true});

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);

// 모든 트윗을 리턴
export async function getAll() {
    return Tweet.find().sort({createAt: -1});
}
// 해당 아이디에 대한 트윗을 리턴
export async function getAllByUsername(username){
    return Tweet.find({username}).sort({createdAt: -1});
}
// 글번호에 대한 트윗을 리턴
export async function getById(id){
    return Tweet.findById(id);
}
// 트윗을 작성
export async function create(text,userId){
    return authRepository.findById(userId).then((user)=> new Tweet({
        text, userId, name: user.name, username: user.username, url: user.url}).save());
}
// 트윗을 변경
export async function update(id, text){
    return Tweet.findByIdAndUpdate(id, {text}, {returnDocument: "after"});
}
// 트윗을 삭제
export async function remove(id){
    return Tweet.findByIdAndDelete(id);
}

// const DataTypes = SQ.DataTypes;
// const Sequelize = sequelize;

// const INCLUDE_USER = {
//     attributes: [
//         'id',
//         'text',
//         'createdAt',
//         'userId',
//         [Sequelize.col('user.name'),'name'],
//         [Sequelize.col('user.username'), 'username'],
//         [Sequelize.col('user.url'),'url']
//     ],
//     include: {
//         model: User,
//         attributes: []
//     }
// }

// const ORDER_DESC = {
//     order: [['createdAt','DESC']]
// }

// const Tweet = sequelize.define('tweet',{
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     text: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     }
// }, { timestamps: false});
// //Join
// Tweet.belongsTo(User);


// // 모든 트윗을 리턴
// export async function getAll() {
//     return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
// }

// // 해당 아이디에 대한 트윗을 리턴
// export async function getAllByUsername(username){
//     return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC, include: {
//         ...INCLUDE_USER.include, where: {username}
//     } });
// }

// // 글번호에 대한 트윗을 리턴
// export async function getById(id){
//     return Tweet.findOne({ where: {id}, ...INCLUDE_USER });
// }

// // 트윗을 작성
// export async function create(text, userId){
//     return Tweet.create({ text, userId }).then((data)=> this.getById(data.dataValues.id));
// }

// // 트윗을 변경
// export async function update(id, text){
//     return Tweet.findByPk(id, INCLUDE_USER).then((tweet)=>{
//         tweet.text = text;
//         return tweet.save();
//     })
// }

// // 트윗을 삭제
// export async function remove(id){
//     return Tweet.findByPk(id).then((tweet)=>{
//         tweet.destroy();
//     });
// }

function mapTweets(tweets){
    return tweets.map(mapOptionalTweet);
}
function mapOptionalTweet(tweet){
    return tweet ? { ...tweet, id: tweet.insertedId } : tweet;
}