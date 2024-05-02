import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as authRepository from '../data/auth.js';


const AUTH_ERROR = {message:"인증에러"};

export const isAuth = async(req,res,next)=>{
    const authHeader = req.get('Authorization');
    console.log(authHeader);
    // .startWith() : 어떤 문자열이 특정 문자로 시작하는지 확인하여 결과를 True 혹은 False로 반환하는 메서드.
    if(!(authHeader && authHeader.startsWith('Bearer '))){
        console.log('Error1');
        return res.status(404).json(AUTH_ERROR);
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token, '%^&*abcd1234', async(error, decoded)=>{
            if(error){
                console.log('Error2');
                return res.status(401).json(AUTH_ERROR);
            }
            const user = await authRepository.findById(decoded.id);
            if(!user){
                console.log('Error3');
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id;
            next();
        } 
    )
    // 토큰
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE3MTQ2MjA1NTQsImV4cCI6MTcxNDc5MzM1NH0.Rm4h3aN9jFTXvUEHHHy-dupSiif8WWap0IU9jHG-EDE
}