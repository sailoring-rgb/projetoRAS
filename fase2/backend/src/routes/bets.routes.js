const express = require('express')
const betsRouter = express.Router()
const betsController = require('../controller/bets.controller')
const authController = require('../controller/auth.controller')

betsRouter.post('/',[
    authController.validateJWT,
    betsController.placeBet
])

exports.betsRouter = betsRouter