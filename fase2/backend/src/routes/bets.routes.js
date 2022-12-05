const express = require('express')
const betsRouter = express.Router()
const betsController = require('../controller/bets.controller')
const authController = require('../controller/auth.controller')

// Place bet
betsRouter.post('/',[
    authController.validateJWT,
    betsController.placeBet
]) 

// Get bets history
betsRouter.get('/',[
    authController.validateJWT,
    betsController.getBetsHistory
]) 



exports.betsRouter = betsRouter