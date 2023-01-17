import "../../css/items/NotificationCard.scss";

export const NotificationCard = ({ notification, markAsRead }) => {
    const parseTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const currDate = new Date();
        const currDayString = `${currDate.getDate()}/${currDate.getMonth()}/${currDate.getFullYear()}`;
        const dayString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        const hourString = `${String(date.getHours()).padStart(
            2,
            "0"
        )}:${String(date.getMinutes()).padStart(2, "0")}`;

        return currDayString === dayString
            ? `Hoje  ${hourString}`
            : `${dayString}  ${hourString}`;
    };

    return (
        <div className="notification-card">
            <div className="content">
                <div className="id">
                    <p>{parseTimestamp(notification.date)}h</p>
                </div>
                <p> {notification.msg} </p>
            </div>

            <button onClick={() => markAsRead(notification.id)}>✔️</button>
        </div>
    );
};
