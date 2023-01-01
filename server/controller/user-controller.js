import User from '../model/user.js';
import bcrypt from 'bcrypt';
import { response } from 'express';
// import { json } from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import token from '../model/token.js';

dotenv.config();


//request arrives from frontend
//reponse means backend to frontend
export const signupUser = async (request, response) =>{
    //for exception handling we are using try and catch as this entire work is going on cloud
    try{
        //for encrypting or appending the pasword we use bycrpt thorugh salt variable
        const salt = await bcrypt.genSalt();
        //for generating hash of the pswrd; hash means generating the random nums on sides of pswrd
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        const user = { username: request.body.username, name: request.body.name, password: hashedPassword }

        // const user = request.body;

        const newUser = new User(user);
        await newUser.save(); //will save the object to database and its async so  putting await and putting async near signupUser

        return response.status(200).json({msg: 'signup successfull'}) //this will tell on frontend that signup is successful
    }catch(error){
        return response.status(500).json({msg: 'error while signing up'})
        //500 is an internal sever error ; this will tell on frontend that there is some error during signing up
    }
}

export const loginUser = async(request,response) => {
    let user = await User.findOne({username: request.body.username });
    if(!user){
        return response.status(400).json({msg : 'username does not match'});
    }
    try{
        let match = await bcrypt.compare(request.body.password, user.password); //for comparingt the pswrd came from fronted to the pswrd stored at backend
        if(match){
            const accessToken = jwt.sing(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn:'15m' });
            const refreshToken = jwt.sing(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({token: refreshToken})
            await newToken.save();

            return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username })


        }else{
            return response.status(400).json({msg:'incorrect password'});
        }
    }catch (error) {
        return response.status(500).json({ msg:'error while login in user' })
    }
}