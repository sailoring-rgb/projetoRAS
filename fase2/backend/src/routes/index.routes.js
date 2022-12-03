const express = require('express')
const { gamesRouter } = require('./games.routes.js')
const { authRouter } = require('./auth.routes.js')
const { betsRouter } = require('./bets.routes.js')

const router = express.Router()

router.use('/auth', (req, res) => authRouter(req, res))
router.use('/games', (req, res) => gamesRouter(req, res))
router.use('/bets', (req, res) => betsRouter(req, res))

module.exports = router