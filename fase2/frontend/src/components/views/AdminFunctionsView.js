import "../../css/blocks/Functions.scss";
import { Link } from "react-router-dom";

export const AdminFunctionsView = () => {
    const isSelected = (path) => path === window.location.pathname;

    return (
        <ul>
            <Link to={`/adminFunctions/betState`}>
                <button className={isSelected("/betState") ? "selected" : ""}>
                    Alterar estado da aposta
                </button>
            </Link>
            <Link to={`/adminFunctions/manageNotifications`}>
                <button className={isSelected("/manageNotifications") ? "selected" : ""}>
                    Gerir Notificações
                </button>
            </Link>
            <Link to={`/adminFunctions/createPromotions`}>
                <button className={isSelected("/createPromotions") ? "selected" : ""}>
                    Criar Promoções
                </button>
            </Link>
        </ul>
    )
}