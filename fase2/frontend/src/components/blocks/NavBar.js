import "../../css/blocks/NavBar.scss";
import { Link } from "react-router-dom";
import notificationIcon from "../../imgs/notificationRead.png";
import { useHistory, useLocation } from "react-router-dom";

export const NavBar = () => {
    const isSelected = (path) => path === window.location.pathname;
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <nav>
            <h2>RasBet</h2>

            <ul>
                <li className={isSelected("/todos") ? "selected" : ""}>
                    <Link to={`/todos`}>Todos</Link>
                </li>
                <li className={isSelected("/football") ? "selected" : ""}>
                    <Link to={`/football`}>Futebol</Link>
                </li>
                <li className={isSelected("/basketball") ? "selected" : ""}>
                    <Link to={`/basketball`}>Basquetebol</Link>
                </li>
                <li className={isSelected("/tenis") ? "selected" : ""}>
                    <Link to={`/tenis`}>Ténis</Link>
                </li>
                <li className={isSelected("/motogp") ? "selected" : ""}>
                    <Link to={`/motogp`}>MotoGP</Link>
                </li>
                <li className={isSelected("/mybets") ? "selected" : ""}>
                    <Link to={`/mybets`}>Apostas</Link>
                </li>
                <li className={isSelected("/notifications") ? "selected" : ""}>
                    <Link to={`/notifications`}>
                        <img src={notificationIcon} />{" "}
                    </Link>
                </li>
            </ul>

            <label>Bem vindo, Carlos</label>
        </nav>
    );
};
