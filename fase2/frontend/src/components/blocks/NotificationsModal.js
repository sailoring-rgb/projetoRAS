import "../../css/blocks/NotificationsModal.scss";
import { NotificationCard } from "../items/NotificationCard";

export const NotificationsModal = ({ notificationsList, closeModal }) => {
    return (
        <div className="notifications-modal-container" onClick={closeModal}>
            <div
                className="notifications-modal-container"
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
                        <label className="no-notifications-label">
                            Sem notificações
                        </label>
                    )}
                </div>
            </div>
        </div>
    );
};
