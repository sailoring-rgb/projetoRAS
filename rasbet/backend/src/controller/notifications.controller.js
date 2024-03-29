const { Notification, User } = require('../model/db/model.db')

class NotificationsController {
    getNotificationsHistory = async (req, res) => {
        const userData = req.jwt
    
        const notifications = (await Notification.findAll({
            where: { userId: userData.id }
        })).map(notification => notification.dataValues)
        
        return res.status(200).json({ notifications })
    }
    
    eliminateNotification= async (req, res) => {
        const {
            notificationId
        } = req.body
        const userData = req.jwt

        console.log("NOTF " + notificationId + "  " + userData.id)
        
        const result = await Notification.destroy({
            where: {
                userId: userData.id,
                id: notificationId
            }
        })
    
        console.log(result)
    
        return await this.getNotificationsHistory(req,res)
        // return res.status(200).json({
        //     status: true,
        //     notifications
        // })
    }
    
    placeNotification = async (req, res) => {
        const {
            notifications,
        } = req.body
        const userData = req.jwt
    
        // Insert notifications 
        notifications.forEach(async notification => {
            const {
                msg,
                time,
            } = notification
    
            await Notification.create({
                userId: userData.id,
                msg: msg,
                time: time,
            })
        })
        
        return res.status(200).json({
            status: true
        })
    }
    
    sendNotification = async (req,res) => {
        const userData = req.jwt
        const { notifsData } = req.body
    
        const randomUUID = crypto.randomUUID()
        const utcCommenceTime = new Date(notifsData.commenceTime).toISOString()
        await Notification.create({
            userId: userData.id,
            id : randomUUID,
            msg: msg, 
            time: utcCommenceTime
        })
        
        return res.status(200).json({
            status: true
        })
    }
}

exports.NotificationsController = NotificationsController