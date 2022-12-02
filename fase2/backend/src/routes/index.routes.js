const express = require('express')
const { gamesRouter } = require('./games.routes.js')
const { authRouter } = require('./auth.routes.js')

const router = express.Router()

router.use('/games', (req, res) => gamesRouter(req, res))
router.use('/auth', (req, res) => authRouter(req, res))

module.exports = router