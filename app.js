'use strict';
const app = require('express')();
const cors = require('cors');
const { sequelize } = require('./sequelize/sequelize');
const bodyParser = require('body-parser');
const { fileController } = require('./modules/files/files.controller');
require('dotenv').config({path:'.development.env'});

//*************************** DB Connection ************************************//
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });


// *********************use body parser ******************************//
app.use(cors({origin:"*"}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


// ******************************* modules ******************************//
app.use('/file',fileController);
//****************************** end modules *************************/



app.listen(process.env.PORT,()=>console.log("server is running on port",process.env.PORT))