import * as authRepository from '../data/auth.js';
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const secret = 'abcdefg1234%^&*';

async function makeToken(id){
    const token = jwt.sign({
        id: id,
        isAdmin: false
    }, secret, {expiresIn : '1h'})
    return token;
}

export async function signup(req,res,next){
    const {username, password, name, email} = req.body;
    const hashed = bcrypt.hashSync(password,10);

    const users = await authRepository.createUser(username,hashed,name,email);
    if(users){
        res.status(201).json(users);
    }
}

export async function login(req,res,next){
    const {username,password} = req.body;
    const user = await authRepository.login(username);

    if(user){
        if(bcrypt.compareSync(password, user.password)){
            // res.status(201).json(`${username} Login Complete`);
            res.status(201).header('Token', makeToken(username)).json(`${username} Login Complete`)
        }else{
            res.status(404).json({message:`${username} plz check your ID or PW`})
        }
    }
}

export async function verify(req,res,next){
    const token = req.header['Token'];
    if(token){
        res.status(200).json(token);     
    }
}