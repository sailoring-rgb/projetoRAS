const express = require("express");
const notifsRouter = express.Router();
const { NotificationsController } = require('../controller/notifications.controller')
const { AuthController } = require('../controller/auth.controller')

class NotificationsRouter {
    constructor() {
        this.router = express.Router()
        this.authController = new AuthController()
        this.notificationsController = new NotificationsController()

        // Place notification
        this.router.post('/',[
            this.authController.validateJWT,
            this.notificationsController.placeNotification
        ])

        // Get notifications history
        this.router.get('/',[
            this.authController.validateJWT,
            this.notificationsController.getNotificationsHistory
        ]) 
        
        // Delete notifications history
        this.router.delete('/',[
            this.authController.validateJWT,
            this.notificationsController.eliminateNotification
        ]) 
    }
}

exports.NotificationsRouter = NotificationsRouter