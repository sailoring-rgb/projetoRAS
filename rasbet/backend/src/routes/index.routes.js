const express = require('express')
const { GamesRouter } = require('./games.routes.js')
const { AuthRouter } = require('./auth.routes.js')
const { BetsRouter } = require('./bets.routes.js')
const { notifsRouter } = require("./notifications.routes.js")
const { TransactionsRouter } = require("./transactions.routes.js")


class RasbetRouter {
    constructor(io) {
        this.router = express.Router()
        this.betsRouter = new BetsRouter(io)
        this.gamesRouter = new GamesRouter(io)
        this.authRouter = new AuthRouter(io)
        this.transactionsRouter = new TransactionsRouter(io)
        
        this.router.use('/auth', this.authRouter.router)
        this.router.use('/games', this.gamesRouter.router)
        this.router.use('/bets', this.betsRouter.router)
        this.router.use("/notifications", notifsRouter)
        this.router.use("/transactions", this.transactionsRouter.router);
    }
}



module.exports = RasbetRouter