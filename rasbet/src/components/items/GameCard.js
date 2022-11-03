import { OddCard } from "./OddCard"
import '../../css/items/GameCard.scss'

export const GameCard = ({game}) => {
    return (
        <div className='game-card'>
            <div className='id-labels'>
                <label className='main-label'>
                    { game.homeTeam } - { game.awayTeam }
                </label>
                <label className='secondary-label'>
                    { game.commenceTime }
                </label>
            </div>

            <div className='odds-list'>
                { game.bookmakers[0].markets[0].outcomes.map(odd => 
                    <OddCard odd={odd} />
                ) }
                
            </div>
        </div>
    )
}