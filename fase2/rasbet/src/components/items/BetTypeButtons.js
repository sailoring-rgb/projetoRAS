import '../../css/items/BetTypeButtons.scss'

export const BetTypeButtons = ({
    betType,
    changeBetType
}) => {
    return (
        <div className='joint-btn'>
            <button
                className={betType === 1 ? 'selected' : ''}
                onClick={() => changeBetType(1)}>
                    Simples
            </button>
            <button 
                className={betType === 2 ? 'selected' : ''} 
                onClick={() => changeBetType(2)}>
                    Múltipla
            </button>
        </div>
    )
}