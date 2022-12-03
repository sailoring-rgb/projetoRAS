import "../../css/blocks/Functions.scss";
import { Link } from "react-router-dom";
import notificationIcon from "../../imgs/notificationRead.png";
import NotificationsModalView from "../views/NotificationsModalView";
import userButton from "../../imgs/user_button.png";

export const Functions = ({ closeModal }) => {
    const isSelected = (path) => path === window.location.pathname;

    return (
        <ul>
            <button className={isSelected("/profile") ? "selected" : ""}>
                <Link to={`/functions/profile`}>
                    <p>Perfil</p>
                </Link>
            </button>
            <button className={isSelected("/notificações") ? "selected" : ""}>
                <Link to={`/functions/notifications`}>
                    <p>Notificações</p>
                </Link>
            </button>
            <button className={isSelected("/mybets") ? "selected" : ""}>
                <Link to={`/functions/mybets`}>
                    <p>Histórico de apostas</p>
                </Link>
            </button>
            <button className={isSelected("/mytransactions") ? "selected" : ""}>
                <Link to={`/functions/mytransactions`}>
                    <p>Histórico de transações</p>
                </Link>
            </button>
        </ul>
    );
};
