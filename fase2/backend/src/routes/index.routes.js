const express = require('express')
const { gamesRouter } = require('./games.routes.js')
const { authRouter } = require('./auth.routes.js')
const { betsRouter } = require('./bets.routes.js')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/games', gamesRouter)
router.use('/bets', betsRouter)

module.exports = router