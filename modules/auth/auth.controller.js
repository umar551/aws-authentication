'use strict';
const { authenticate, registerUser, refreshToken } = require('./auth.service');
const authController = require('express').Router();

// ************************************ User Controllers ***************************************//
authController.post('/authenticate',authenticate);
authController.post('/register',registerUser);
authController.post('/refresh-token',refreshToken);

// ************************************ End User Controllers ***************************************//
module.exports = {authController}