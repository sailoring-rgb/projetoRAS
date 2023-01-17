const express = require("express");
const notifsRouter = express.Router();
const notifsController = require('../controller/notifications.controller')
const authController = require('../controller/auth.controller')

// Place notification
notifsRouter.post('/',[
    authController.validateJWT,
    notifsController.placeNotification
])

// Get notifications history
notifsRouter.get('/',[
    authController.validateJWT,
    notifsController.getNotificationsHistory
]) 

// Delete notifications history
notifsRouter.delete('/',[
    authController.validateJWT,
    notifsController.eliminateNotification
]) 

exports.notifsRouter = notifsRouter