const express = require('express')

const gamesRouter = express.Router()

gamesRouter.get('/', async (_req, res) => {
  const msg = {
    msg: 'GET request to /games'
  }
  return res.status(200).send(msg)
})

gamesRouter.post('/', async (req, res) => {
  const msg = {
    msg: 'POST request to /games',
    data: req.body
  }
  return res.status(200).send(msg)
})

exports.gamesRouter = gamesRouter