const express = require('express')
// const betsRouter = express.Router()
const { BetsController } = require('../controller/bets.controller')
const { AuthController } = require('../controller/auth.controller')

class BetsRouter {
    constructor(io) {
        this.betsController = new BetsController(io)
        this.authController = new AuthController(io)
        this.router = express.Router()

        // Place bet
        this.router.post('/',[
            this.authController.validateJWT,
            this.betsController.placeBet
        ])

        // Place bet
        this.router.get('/test', async (req, res) => {
            console.log("Receiving test")

            const clients = io.sockets.sockets

            clients.forEach(c => {
                console.log(c.handshake.auth.id)
                c.emit('new_message', 'MSG FROM THE SERVER')
            });

            return res.status(200).json("ok")
        })
        
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
    }
}


exports.BetsRouter = BetsRouter