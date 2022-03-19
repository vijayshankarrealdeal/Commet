const express = require('express');
const router = express.Router();
const MongoDB=require('./../MongoDB/MongoDB');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const passwordHash=require('password-hash');

module.exports = () => {

    const authenticate = (request, response, next) => {
        const authJWTToken=request.headers['authorizationToken'];

        if(authJWTToken==null)
            response.sendStatus(401);
        
        jwt.verify(authJWTToken,process.env.ACCESS_TOKEN_SECRET,(err,username)=>{
            if(err)
                return response.sendStatus(403);
            console.log(username);
            next();
        })
    }

    router.post('/register',async (request,response)=>{
        console.log(request.body);

        try{
            const mongodb = new MongoDB();
            var res=await mongodb.insertOneUserData({
                    name:request.body.name,
                    email:request.body.email,
                    password:passwordHash.generate(request.body.password),
                    admin:request.body.admin
                });
        }catch(err){
            console.log(err)
        }
        //creation of access token
        var accessToken=jwt.sign({email:request.body.email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'24h'});
        if(res.respose){
            response.json({response:true,accessToken:accessToken});
        }else{
            response.send(res);
        }

    });

    router.post('/login',async (request, response)=>{
        try{
            const mongodb = new MongoDB();
            var user=await mongodb.getUserByEmail(request.body.email);
            if(user==null){
                response.json({response:false,reason:'User does not Exist'});
            }else{
                const verification=passwordHash.verify(request.body.password,user.password);
                if(verification==false){
                    return response.json({response:false,reason:'Incorrect Password'});
                }else{
                    var accessToken=jwt.sign({email:request.body.email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'24h'});
                    response.json({response:true,accessToken:accessToken});
                }
            }
        }catch(err){
            console.log(err)
        }
        response.json({});
    })

    router.get('/',authenticate,(request,response)=>{
        response.send('REXrt')
    })

    

    return router;
}