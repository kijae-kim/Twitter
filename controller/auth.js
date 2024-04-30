import * as authRepository from '../data/auth.js'

export async function signup(req,res,next){
    const {username, password, name, email} = req.body;
    const users = await authRepository.createUser(username,password,name,email);
    if(users){
        res.status(201).json(users);
    }
}

export async function login(req,res,next){
    const {username,password} = req.body;
    const user = await authRepository.login(username);

    if(user){
        res.status(201).json(`${username} Login Complete`);
    // }else if(password){
    //     res.status(201).json()
    }else{
        res.status(404).json({message: `${username} plz check your ID and PW`})
    }
}