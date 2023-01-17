const express = require('express')
const gamesRouter = express.Router()
const gamesController = require('../controller/games.controller')
const authController = require('../controller/auth.controller')

gamesRouter.get('/:game/', [
  authController.validateJWT,
  gamesController.getGames
])

gamesRouter.post('/', [
  authController. validateJWT,
  gamesController.createGame
])

gamesRouter.post('/follow', [
  authController. validateJWT,
  gamesController.followGame
])

gamesRouter.get('/id/:gameId', [
  authController. validateJWT,
  gamesController.getGameById
])

exports.gamesRouter = gamesRouter