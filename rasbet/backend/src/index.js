const dotenv = require('dotenv')
dotenv.config()
const express = require("express")
const http = require("http")
const cors = require("cors")
const RasbetRouter = require('./routes/index.routes')
const { sequelizeConnection, dbInit } = require('./db/db.init')
const { GamesController } = require('./controller/games.controller')
const cron = require('node-cron');

const port = process.env.PORT || 3001
const app = express()
const server = http.createServer(app)

const rasbetRouter = new RasbetRouter()
const gamesController = new GamesController()

dbInit(sequelizeConnection)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(rasbetRouter.router)

const cronJob = cron.schedule('*/10 * * * * *', function() {
    console.log('Cron running');
    gamesController.updateDbGames()
});
cronJob.start()

server.listen(port, () => console.log(`Listening on port ${port}`));
