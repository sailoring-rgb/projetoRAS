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

// Delete bet
betsRouter.delete('/',[
    authController.validateJWT,
    betsController.cancelBet
]) 

// Change bet state
betsRouter.post('/',[
    authController.validateJWT,
    betsController.changeState
])


exports.betsRouter = betsRouter