import { Link } from "react-router-dom";
import "../../css/blocks/Functions.scss";

export const EspFunctionsView = () => {
    const isSelected = (path) => path === window.location.pathname;

    return (
        <ul>
            <Link to={`/espFunctions/addGAme`}>
                <button className={isSelected("/addGame") ? "selected" : ""}>
                    <p>Adicionar evento desportivo</p>
                </button>
            </Link>
            <Link to={`/espFunctions/removeGame`}>
                <button className={isSelected("/removeGAme") ? "selected" : ""}>
                    <p>Remover evento desportivo</p>
                </button>
            </Link>
            <Link to={`/espFunctions/changeOdd`}>
                <button className={isSelected("/changeOdd") ? "selected" : ""}>
                    <p>Alterar odd de evento desportivo</p>
                </button>
            </Link>
            <Link to={`/espFunctions/insert`}>
                <button className={isSelected("/insertOdd") ? "selected" : ""}>
                    <p>Inserir odd de evento desportivo</p>
                </button>
            </Link>
        </ul>
    )
}
