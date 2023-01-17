const { Notification, User } = require('../model/db/model.db')

exports.getNotificationsHistory = async (req, res) => {
    const userData = req.jwt

    const notifications = (await Notification.findAll({
        where: { userId: userData.id }
    })).map(notification => notification.dataValues)
    
    return res.status(200).json({ notifications })
}


exports.eliminateNotification= async (req, res) => {
    const {
        notificationId
    } = req.body
    const userData = req.jwt
    
    const result = await Notification.destroy({
        where: {
            userId: userData.id,
            id: notificationId
        }
    })

    console.log(result)

    const notificationsHistory = await this.getNotificationsHistory(req,res)
    
    return res.status(200).json({
        status: true,
        notificationsHistory
    })
}

exports.placeNotification = async (req, res) => {
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

        const newNotification = await Notification.create({
            userId: userData.id,
            msg: msg,
            time: time,
        })
    })
    
    return res.status(200).json({
        status: true
    })
}