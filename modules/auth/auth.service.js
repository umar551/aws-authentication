'use strict';
const { sequelize } = require("../../sequelize/sequelize");
const { QueryTypes }  = require('sequelize'); 
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

async function authenticate(req,res){
    
    try {
        const query = "SELECT u.id as userId, u.email,u.password  FROM users u where email = ?";
        let data =  await sequelize.query(query,
            {
                replacements: [req.body.email],
                type:QueryTypes.SELECT
            })
            if(data.length>0 && data[0].password==req.body.password){
                delete data[0].password;
                const token = jwt.sign(
                    data[0],
                    process.env.TOKEN_KEY,
                    {
                    expiresIn: "2h",
                    }
                );
                var salt = bcryptjs.genSaltSync(10);
                var refreshToken = bcryptjs.hashSync("B4c0/\/", salt);
                let refreshExpiryTime = new Date(new Date().getTime() + 3 * 60 * 60 * 1000).getTime();
                const query = "UPDATE users SET refresToken=?, refreshExpiryTime=? where id=?";
                await sequelize.query(query,
                    {
                        replacements: [refreshToken,refreshExpiryTime,data[0].userId],
                        type:QueryTypes.UPDATE
                    });
                // save user token
                data[0].access_token = token;
                data[0].refresh_token = refreshToken;
            return  res.json({
                    message:'Login Sucessfully',
                    sucess:true,
                    data:data
                })          
            }
            else{
          return  res.json({
                message:'Invalid Credentials',
                sucess:false,
             }) 
        }
        
    } catch (error) {
        res.json({
            message:error.message,
            sucess:false,
            expection:error.stack
         }) 
    }
}

async function refreshToken(req,res){
    try {
        const data = await sequelize.query('SELECT u.id as userId, u.email as email, u.refreshExpiryTime FROM users u where refresToken = ?',
        {
            replacements:[req.body.refresToken],
            type:QueryTypes.SELECT
        });

        if(data.length&&data[0].refreshExpiryTime>new Date().getTime()){
            const token = jwt.sign(
                data[0],
                process.env.TOKEN_KEY,
                {
                expiresIn: "2h",
            })

            var salt = bcryptjs.genSaltSync(10);
                var refreshToken = bcryptjs.hashSync("B4c0/\/", salt);
                let refreshExpiryTime = new Date(new Date().getTime() + 3 * 60 * 60 * 1000).getTime();
                const query = "UPDATE users SET refresToken=?, refreshExpiryTime=? where id=?";
                await sequelize.query(query,
                    {
                        replacements: [refreshToken,refreshExpiryTime,data[0].userId],
                        type:QueryTypes.UPDATE
                    });
                // save user token
                data[0].access_token = token;
                data[0].refresh_token = refreshToken;
            
            res.json({
                message:'',
                sucess:true,
                data:{
                    access_token:token,
                    refresh_token:refreshToken
                }})   
        }
       else{
        res.json({
            message:'Token Expired or Invalid Token',
            sucess:false,
         }) 
       }
    } catch (error) {
        res.json({
            message:error.message,
            sucess:false,
            expection:error.stack
         }) 
    }
    
}


async function registerUser(req,res){
    try {
        const query = "INSERT INTO users (name,email,password) VALUES (?,?,?)";
        await sequelize.query(query,
        {
            replacements: [req.body.userName,req.body.email,req.body.password],
            type:QueryTypes.INSERT
        })
        res.json({
            message:'User Registered Sucessfully',
            sucess:true,
         }) 


    } catch (error) {
        res.json({
            message:error.message,
            sucess:false,
            expection:error.stack
         }) 
    }
    
}
module.exports = {authenticate,registerUser, refreshToken}