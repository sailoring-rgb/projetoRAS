import { OddCard } from "./OddCard"
import '../../css/items/GameCard.scss'
import { useEffect, useState } from "react"

export const GameCard = ({game, onOddClick}) => {

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
                { (game.odds && game.oddsKey) && Object.values(game.odds).map(odd => 
                    <OddCard key={`${game.oddsKey}_${odd.name}`} odd={odd} onClick={() => onOddClick(game.id, odd)} />
                ) }
                
            </div>
        </div>
    )
}