import "../../css/blocks/Functions.scss";
import { Link } from "react-router-dom";
import notificationIcon from "../../imgs/notificationRead.png";
import NotificationsModalView from "../views/NotificationsModalView";
import userButton from "../../imgs/user_button.png";

export const Functions = ({closeModal }) => {
    const isSelected = (path) => path === window.location.pathname;
    
    return (
            <ul>
                <button className={isSelected("/profile") ? "selected" : ""}>
                    <Link to={`/functions/profile`}>Perfil</Link>
                </button>
                <button className={isSelected("/notificações") ? "selected" : ""}>
                    <Link to={`/functions/notifications`}>Notificações</Link>
                </button>
                <button className={isSelected("/mybets") ? "selected" : ""}>
                    <Link to={`/functions/mybets`}>Histórico de apostas</Link>
                </button>
                <button className={isSelected("/mytransactions") ? "selected" : ""}>
                    <Link to={`/functions/mytransactions`}>Histórico de transações</Link>
                </button>
            </ul>
    );
};
