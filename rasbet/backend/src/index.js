const dotenv = require('dotenv')
dotenv.config()
const express = require("express")
const http = require("http")
const cors = require("cors")
const routes = require('./routes/index.routes')
const { sequelizeConnection, dbInit } = require('./db/db.init')
const { updateDbGames } = require('./controller/games.controller')
const cron = require('node-cron');

const port = process.env.PORT || 3001
const app = express()
const server = http.createServer(app)

dbInit(sequelizeConnection)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

const cronJob = cron.schedule('*/20 * * * * *', function() {
    console.log('Cron running');
    updateDbGames()
});
cronJob.start()

server.listen(port, () => console.log(`Listening on port ${port}`));