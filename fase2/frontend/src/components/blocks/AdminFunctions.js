import "../../css/blocks/Functions.scss";
import { Link } from "react-router-dom";

export const AdminFunctions = ({ closeModal }) => {
    const isSelected = (path) => path === window.location.pathname;

    return (
        <ul>
            <button className={isSelected("/betState") ? "selected" : ""}>
                <Link to={`/adminFunctions/betState`}>
                    <p>Alterar estado da aposta</p>
                </Link>
            </button>
            <button className={isSelected("/manageNotifications") ? "selected" : ""}>
                <Link to={`/adminFunctions/manageNotifications`}>
                    <p>Gerir Notificações</p>
                </Link>
            </button>
            <button className={isSelected("/createPromotions") ? "selected" : ""}>
                <Link to={`/adminFunctions/createPromotions`}>
                    <p>Criar Promoções</p>
                </Link>
            </button>
        </ul>
    );
};
