const express = require('express')
// const betsRouter = express.Router()
const { BetsController } = require('../controller/bets.controller')
const { AuthController } = require('../controller/auth.controller')

class BetsRouter {
    constructor() {
        this.betsController = new BetsController()
        this.authController = new AuthController()
        this.router = express.Router()

        // Place bet
        this.router.post('/',[
            this.authController.validateJWT,
            this.betsController.placeBet
        ])
        
        // Get bets history
        this.router.get('/',[ 
            this.authController.validateJWT,
            this.betsController.getBetsHistory
        ]) 
        
        // Get bets history
        this.router.delete('/',[
            this.authController.validateJWT,
            this.betsController.cancelBet
        ])

        // Change bet state
        this.router.post('/',[
            this.authController.validateJWT,
            this.betsController.changeState
        ])
    }
}


exports.BetsRouter = BetsRouter