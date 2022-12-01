import "../../css/items/NotificationCard.scss";

export const NotificationCard = ({ notification }) => {
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
            <label className="label">
                {parseTimestamp(notification.date)}h
            </label>
            <p> {notification.msg} </p>
        </div>
    );
};
