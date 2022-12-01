import "../../css/items/BetCard.scss";

export const TransactionCard = ({ bet, onCardClick, onRemoveBetClick }) => {
    return (
        <div className="transaction-card" onClick={() => onCardClick(bet)}>
            <header>
                <label> {bet.gameName} </label>
                <button onClick={() => onRemoveBetClick(bet.id)}>X</button>
            </header>

            <hr />

            <div className="bet-info">
                <label>
                    Resultado:
                    {bet.result === "Draw" ? " Empate" : ` ${bet.result} vence`}
                </label>
                <div className="bet-odd-label">Cota: {bet.odd}</div>
                <label>{bet.total}€</label>
            </div>
        </div>
    );
};