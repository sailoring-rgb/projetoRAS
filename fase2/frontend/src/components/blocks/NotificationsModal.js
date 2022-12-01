import "../../css/blocks/NotificationsModal.scss";
import { NotificationCard } from "../items/NotificationCard";

export const NotificationsModal = ({ notificationsList, closeModal }) => {
    return (
        <div className="notifications-modal-container" onClick={closeModal}>
            <div
                className="notifications-modal-main"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Notifications</h2>
                <div className="notifications-modal">
                    {notificationsList &&
                    Object.values(notificationsList).length > 0 ? (
                        Object.values(notificationsList).map(
                            (notification, i) => (
                                <NotificationCard
                                    key={i}
                                    notification={notification}
                                />
                            )
                        )
                    ) : (
                        <dic className="no-notifications-label">
                            <hr className="solid"></hr>
                            <p>Sem notificações</p>
                        </dic>
                    )}
                </div>
            </div>
        </div>
    );
};
