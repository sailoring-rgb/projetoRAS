const express = require('express')
const gamesApi = require('../utils/apis')
const gamesRouter = express.Router()

gamesRouter.get('/:game/', async (req, res) => {
  const gameFetchFunctions = {
    football: gamesApi.fetchFootballGames,
    basketball: gamesApi.fetchBasketballGames,
    // tenis: ,
    // motoGP: ,
  }
  
  return res.status(200).send(await gameFetchFunctions[req.params.game]())
})

gamesRouter.post('/', async (req, res) => {
  const msg = {
    msg: 'POST request to /games',
    data: req.body
  }
  return res.status(200).send(msg)
})

exports.gamesRouter = gamesRouter