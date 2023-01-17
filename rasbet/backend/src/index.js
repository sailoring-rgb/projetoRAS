const dotenv = require('dotenv')
dotenv.config()
const express = require("express")
const http = require("http")
const cors = require("cors")
const routes = require('./routes/index.routes')
const { sequelizeConnection, dbInit } = require('./db/db.init')
const { updateDbGames } = require('./controller/games.controller')
const cron = require('node-cron');

const { Server, Socket } = require("socket.io");
// import SocketController from "./controller/sockets";

const port = process.env.PORT || 3001
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: { origin: '*' }
});
// const socketController = new SocketController(dataContainer);

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

io.on('connection', (socket) => {
    console.log(socket)
    // socketController.onConnect(io, socket)
});