'use strict';
const { getAllUsers } = require('./users.service');
const { updateUsers } = require('./users.service');
const { deleteUsers } = require('./users.service');
const userController = require('express').Router();

// ************************************ User Controllers ***************************************//
userController.post('/get-all-user',getAllUsers);
userController.post('/update-user',updateUsers);
userController.post('/delete-user',deleteUsers);
// ************************************ End User Controllers ***************************************//
module.exports = {userController}