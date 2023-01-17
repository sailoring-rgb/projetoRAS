import { Notification } from "../models/Notification";

export const placeNotification = async (notifications) => {
    const userToken = localStorage.getItem("user_token")

    const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
            notifications
        })
    }).then(res => res.json());
    return data
}

export const getNotifictionsHistory = async () => {
    const userToken = localStorage.getItem("user_token")

    const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications`, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }).then(res => res.json());

    const notifications = data.map(notification => new Notification(notification.id, notification.msg, notification.time))
    return notifications
}

export const eliminateNotification = async (notifId) => {
    const userToken = localStorage.getItem("user_token")
    const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({ notifId })
    }).then(res => res.json())
    console.log(data)
    data.notificationsHistory = data.notificationsHistory.map(notification => new Notification(notification.id, notification.msg, notification.time))

    return data
}