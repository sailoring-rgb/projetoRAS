import { Link } from "react-router-dom";
import "../../css/blocks/Functions.scss";

export const FunctionsView = () => {
    const isSelected = (path) => path === window.location.pathname;

    return (
        <ul>
            <Link to={`/functions/profile`}>
                <button className={isSelected("/profile") ? "selected" : ""}>
                    <p>Perfil</p>
                </button>
            </Link>
            <Link to={`/functions/notifications`}>
                <button className={isSelected("/notificações") ? "selected" : ""}>
                    <p>Notificações</p>
                </button>
            </Link>
            <Link to={`/functions/mybets`}>
                <button className={isSelected("/mybets") ? "selected" : ""}>
                    <p>Histórico de apostas</p>
                </button>
            </Link>
            <Link to={`/functions/mytransactions`}>
                <button className={isSelected("/mytransactions") ? "selected" : ""}>
                    <p>Histórico de transações</p>
                </button>
            </Link>
        </ul>
    )
}
