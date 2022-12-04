import "../../css/blocks/Functions.scss";
import { Link } from "react-router-dom";

export const EspFunctions = ({ closeModal }) => {
    const isSelected = (path) => path === window.location.pathname;

    return (
        <ul>
            <button className={isSelected("/addGame") ? "selected" : ""}>
                <Link to={`/espFunctions/addGAme`}>
                    <p>Adicionar evento desportivo</p>
                </Link>
            </button>
            <button className={isSelected("/removeGAme") ? "selected" : ""}>
                <Link to={`/espFunctions/removeGame`}>
                    <p>Remover evento desportivo</p>
                </Link>
            </button>
            <button className={isSelected("/changeOdd") ? "selected" : ""}>
                <Link to={`/espFunctions/changeOdd`}>
                    <p>Alterar odd de evento desportivo</p>
                </Link>
            </button>
            <button className={isSelected("/insertOdd") ? "selected" : ""}>
                <Link to={`/espFunctions/insert`}>
                    <p>Inserir odd de evento desportivo</p>
                </Link>
            </button>
        </ul>
    );
};
