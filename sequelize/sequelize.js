const Sequelize = require('sequelize');
require('dotenv').config({path:'.development.env'});
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER_NAME,
    process.env.DB_PASSWORD,
     {
       host: process.env.DB_URL,
       dialect: process.env.DB_TYPE || "mysql"
     }
   );
module.exports = {sequelize}