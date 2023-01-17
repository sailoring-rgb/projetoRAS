const express = require('express')
const { GamesRouter } = require('./games.routes.js')
const { AuthRouter } = require('./auth.routes.js')
const { BetsRouter } = require('./bets.routes.js')
const { NotificationsRouter } = require("./notifications.routes.js")
const { TransactionsRouter } = require("./transactions.routes.js")

class RasbetRouter {
    constructor() {
        this.router = express.Router()
        this.betsRouter = new BetsRouter()
        this.gamesRouter = new GamesRouter()
        this.authRouter = new AuthRouter()
        this.transactionsRouter = new TransactionsRouter()
        this.notificationsRouter = new NotificationsRouter()
        
        this.router.use('/auth', this.authRouter.router)
        this.router.use('/games', this.gamesRouter.router)
        this.router.use('/bets', this.betsRouter.router)
        this.router.use("/notifications", this.notificationsRouter.router)
        this.router.use("/transactions", this.transactionsRouter.router);
    }
}

module.exports = RasbetRouter