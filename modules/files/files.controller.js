const { uploadFile } = require('./files.service');
const upload = require("multer")();
const fileController = require('express').Router();

// ************************************ File Controllers ***************************************//


fileController.post('/upload-file',upload.array('files'),uploadFile);



// ************************************ End File Controllers ***************************************//
module.exports = {fileController}