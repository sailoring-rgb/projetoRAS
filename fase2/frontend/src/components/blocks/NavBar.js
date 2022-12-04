import "../../css/blocks/NavBar.scss";
import { Link } from "react-router-dom";
import userButton from "../../imgs/user_button.png";
import { useStateValue } from "../../state";
import { useEffect } from "react";

export const NavBar = () => {
    const { state } = useStateValue()
    const isSelected = (path) => path === window.location.pathname;

    useEffect(() => {console.log(state.authUser)}, [state.authUser])

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
                <li className={isSelected("/functions") ? "selected" : ""}>
                    <Link to={`/functions`}>
                        <img src={userButton} />{" "}
                    </Link>
                </li>
            </ul>
            <label>Bem vindo, { state.authUser && state.authUser.firstName }</label>
        </nav>
    );
};
