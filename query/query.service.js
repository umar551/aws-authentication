'use strict';
const { sequelize } = require("../sequelize/sequelize");
const { QueryTypes }  = require('sequelize'); 
async function selectSingle(query="",data=[],isSp=false){
    if(isSp){
        return (await sequelize.query(query,{replacements:[...data],type:QueryTypes.RAW}))[0];
    }
    const result = (await sequelize.query(query,{replacements:[...data],type:QueryTypes.RAW}))[0];
    return result[0];
}
async function selectAll(query,data=[],isSp=false){
    if(isSp){
        return await sequelize.query(query,{replacements:[...data]});
    }
    return (await sequelize.query(query,{replacements:[...data]}))[0];
}
async function insertUpdateDelete(query,data){
    return await sequelize.query(query,{replacements:[...data],type:QueryTypes.RAW});
}
module.exports = {selectSingle,selectAll,insertUpdateDelete}