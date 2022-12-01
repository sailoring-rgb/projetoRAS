import "../../css/blocks/Functions.scss";
import { Link } from "react-router-dom";
import notificationIcon from "../../imgs/notificationRead.png";
import NotificationsModalView from "../views/NotificationsModalView";
//import { FunctionsCard } from "../items/FunctionsCard";

export const Functions = ({closeModal }) => {
    const isSelected = (path) => path === window.location.pathname;
    
    return (
            <ul>
                <li className={isSelected("/profile") ? "selected" : ""}>
                    <Link to={`/functions/profile`}>Perfil</Link>
                </li>
                <li className={isSelected("/notificações") ? "selected" : ""}>
                    <Link to={`/functions/notifications`}>Notificações</Link>
                </li>
                <li className={isSelected("/mybets") ? "selected" : ""}>
                    <Link to={`/functions/mybets`}>Histórico de apostas</Link>
                </li>
                <li className={isSelected("/mytransactions") ? "selected" : ""}>
                    <Link to={`/functions/mytransactions`}>Histórico de transações</Link>
                </li>
            </ul>
    );
};
