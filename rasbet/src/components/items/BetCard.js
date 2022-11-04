import '../../css/items/BetCard.scss'

export const BetCard = ({bet, onClick}) => {
    return (
        <div className='bet-card' onClick={onClick}>
            <header>
            <label> {bet.gameName} </label>
            <button>X</button>
            </header>

            <hr/>
            
            <div className='bet-info'>
            
            <label>Resultado:  
                { bet.result === 'Draw' 
                ? ' Empate'
                : ` ${bet.result} vence`
            }</label>
            <div className='bet-odd-label'>
                Cota: { bet.odd }
            </div>
            </div>

        </div>
    )
}