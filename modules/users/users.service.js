'use strict';
const { sequelize } = require("../../sequelize/sequelize");
const { QueryTypes }  = require('sequelize'); 


async function getAllUsers(req,res){
    try {
        const result = await sequelize.query('SELECT * FROM users',{type:QueryTypes.SELECT});
        if(result&&result.length){
         res.json({
            message:'',
            sucess:true,
            data:result
         })   
        }
        else{
            res.json({
                message:'Record Not Found',
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

async function updateUsers(req,res){
    try {
        const result = await sequelize.query('call sp_update_user(?)',
        {
            replacements: [[req.body.id,req.body.name,req.body.email]],
            type:QueryTypes.UPDATE
        });
        if(result&&result.length){
         res.json({
            message:'Record Updated Succesfully',
            sucess:true,
            data:result
         })   
        }
        else{
            res.json({
                message:'Record Not Found',
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

async function deleteUsers(req,res){
    try {
        const result = await sequelize.query('call sp_delete_user(?)',
        {
            replacements: [[req.body.id, req.body.isDeleted]],
            type:QueryTypes.UPDATE
        });
        if(result&&result.length){
         res.json({
            message:'Record Deleted Succesfully',
            sucess:true,
            data:result
         })   
        }
        else{
            res.json({
                message:'Record Not Found',
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

module.exports={getAllUsers,updateUsers,deleteUsers};