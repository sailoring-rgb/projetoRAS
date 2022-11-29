import { useState } from "react"
import '../../css/blocks/NotificationsList.scss'
import { Notification } from '../../models/Notification.js';
import notificationButton from '../../imgs/notificacion_button.png'

export const NotificationsList = ({
    notification,
    notificationsList,
}) => {

    return(
        <div className='notificationslist-container'>
            <h2>Notifications</h2>
            <button>
                <div className="img-btn">
                    <img src={notificationButton} />
                </div>
            </button>
        </div>

    )
}