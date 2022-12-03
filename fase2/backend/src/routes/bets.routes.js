const express = require('express')
const betsRouter = express.Router()
const betsController = require('../controller/bets.controller')

betsRouter.post('/', betsController.placeBet)

exports.betsRouter = betsRouter