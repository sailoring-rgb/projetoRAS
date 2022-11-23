const express = require('express')
const gamesRouter = require('./games.routes.js').gamesRouter

const router = express.Router()

router.use('/games', (req, res) => gamesRouter(req, res))

module.exports = router