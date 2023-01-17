import { NotificationCard } from "../items/NotificationCard";
import "../../css/blocks/NotificationsModal.scss";
import { useEffect, useState } from "react";
import { getNotificationsHistory } from "../../utils/notificationsApi";
import { useUserAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const NotificationsView = () => {
    const [ notificationsList, setNotificationsList ] = useState([])
    const { signout } = useUserAuth()
    const nav = useNavigate()

    const fetchNotifications = async () => {
        const notifications = await getNotificationsHistory()
        if(notifications.name == 'Error') {
            switch(parseInt(notifications.message)) {
                case 401:
                case 403:
                    signout()
                    nav('/signin')
                default:
                console.log("An error occured")
            }
            return 
        }

        setNotificationsList(notifications)
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    return (
        <div className="notifications-container">
            <h2>Notificações</h2>
            <div className="notifications-modal">
                {notificationsList && notificationsList.length > 0
                ? notificationsList.map(notification => (
                    <NotificationCard
                        key={notification.id}
                        notification={notification}
                    /> )
                ) : (
                    <dic className="no-notifications-label">
                        <hr className="solid"></hr>
                        <p>Sem notificações</p>
                    </dic>
                )}
            </div>
        </div>
    )
}
