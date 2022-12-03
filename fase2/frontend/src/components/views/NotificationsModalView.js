import { useState } from "react";
import { NotificationsModal } from "../blocks/NotificationsModal.js";

function NotificationsModalView({ closeModal }) {
    const [displayNotificationsModal, setDisplayNotificationsModal] =
        useState(false);

    const notifs = [
        {
            id: "dnied19e123",
            msg: "O jogo Benfica - Rio Ave no qual apostou chegou ao fim. Parabéns, ganhou!",
            date: "2022-12-02T19:30:00.000Z",
        },
        {
            id: "akdkahdskd",
            msg: "O jogo Vitória SC - Arouca no qual apostou chegou ao fim. Oops, não teve sorte!",
            date: "2022-12-19T12:30:00.000Z",
        },
        {
            id: "019382jdks",
            msg: "O jogo Braga - Famalicão no qual apostou chegou ao fim. Parabéns, ganhou!",
            date: "2022-11-30T08:22:00.000Z",
        },
        {
            id: "0392dakcnh",
            msg: "O jogo Sporting - Marinhense no qual apostou chegou ao fim. Oops, não teve sorte!",
            date: "2022-10-09T14:15:00.000Z",
        },
        {
            id: "skjjsjdans",
            msg: "O jogo Oeiras - Marítimo no qual apostou chegou ao fim. Oops, não teve sorte!",
            date: "2022-09-12T20:02:00.000Z",
        },
    ];
    const notifications = JSON.stringify(notifs);
    const notificationsList = JSON.parse(notifications);
    console.log(notificationsList);

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
