import { useState } from "react";
import { NotificationsModal } from "../blocks/NotificationsModal.js";

function NotificationsModalView({ notificationsList, closeModal }) {
    const [displayNotificationsModal, setDisplayNotificationsModal] =
        useState(false);

    return (
        <main className="container" onClick={closeModal}>
            <NotificationsModal
                notificationsList={notificationsList}
                closeModal={() => setDisplayNotificationsModal(false)}
            />
        </main>
    );
}
export default NotificationsModalView;
