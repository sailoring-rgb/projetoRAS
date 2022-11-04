import { OddCard } from "./OddCard"
import '../../css/items/GameCard.scss'
import { useEffect, useState } from "react"

export const GameCard = ({game, onOddClick}) => {

    const parseTimestamp = (timestamp) => {
        const date = new Date(timestamp)
        const currDate = new Date()
        const currDayString = `${currDate.getDate()}/${currDate.getMonth()}/${currDate.getFullYear()}` 
        const dayString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` 
        const hourString = `${date.getHours()}:${date.getMinutes()}`
        
        return (currDayString === dayString) 
            ? `Hoje ${hourString}`
            : `${dayString} ${hourString}`
    }

    return (
        <div className='game-card'>
            <div className='id-labels'>
                <label className='main-label'>
                    { game.homeTeam } - { game.awayTeam }
                </label>
                <label className='secondary-label'>
                    { parseTimestamp(game.commenceTime) }
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