import SQ from 'sequelize';
import { sequelize } from '../DB/database.js';
const DataTypes = SQ.DataTypes;
// sequelize에서 사용하는 모든 데이터 형(INT,STRING ...)을 저장하고 생성하게끔 만들어줌.

//tweets User  쿼리 문을 안쓰기 위해서 바로 컬럼을 만들어준다.
export const User = sequelize.define(
    'user',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password:{
            type: DataTypes.STRING(150),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        url: DataTypes.STRING(1000)
    },
    { timestamps: false }   //시간값을 넣게 되어있음.
);
// 외부에서 User라는 사용자 틀을 가져다가 사용할 수 있게끔 만들어줌.

// 아이디(username) 중복검사
export async function findByUsername(username){
    return User.findOne({where: {username}});
    //{where: {조건}}
}
// id 중복검사
export async function findById(id){
    return User.findByPk(id);
}
export async function createUser(user){
    return User.create(user).then((data)=>data.dataValues.id)
}
// export async function login(username){
//     const user = users.find((user) => user.username === username)
//     return user;
// }