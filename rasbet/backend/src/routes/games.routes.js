const express = require('express')
const { GamesController } = require('../controller/games.controller')
const { AuthController } = require('../controller/auth.controller')

class GamesRouter {
  constructor() {
    this.router = express.Router()
    this.authController = new AuthController()
    this.gamesController = new GamesController()

    this.router.get('/:game/', [
      this.authController.validateJWT,
      this.gamesController.getGames
    ])
    
    this.router.post('/', [
      this.authController. validateJWT,
      this.gamesController.createGame
    ])
    
    this.router.post('/follow', [
      this.authController. validateJWT,
      this.gamesController.followGame
    ])
    
    this.router.get('/id/:gameId', [
      this.authController. validateJWT,
      this.gamesController.getGameById
    ])
  }
}

exports.GamesRouter = GamesRouter