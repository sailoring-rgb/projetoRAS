const express = require('express')
const { TransactionsController } = require('../controller/transactions.controller')
const { AuthController } = require('../controller/auth.controller')

class TransactionsRouter {
    constructor() {
        this.router = express.Router()
        this.authController = new AuthController()
        this.transactionsController = new TransactionsController()

        // Place bet
        this.router.post('/',[
            this.authController.validateJWT,
            this.transactionsController.createTransaction
        ])
        
        // Get bets history
        this.router.get('/',[
            this.authController.validateJWT,
            this.transactionsController.getTransactionsHistory
        ]) 
    }
}


exports.TransactionsRouter = TransactionsRouter