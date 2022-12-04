import React, { useState } from 'react';
import { CreateGame} from "../items/CreateGame"
import { NavBar } from "../blocks/NavBar";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import '../../css/views/CreateGameView.scss'

export const CreateGameView = () => {
    const [ gameID, setGameId ] = useState('')
    const [ homeTeam, setHomeTeam ] = useState('')
    const [ awayTeam, setAwayTeam ] = useState('')
    const [ comenceTime, setCommenceTime ] = useState('')
    const [ odd, odds ] = useState('')
    
    return (
        <div className='create-game-container'> 
            <NavBar />
            <label for="GameID">Game ID:</label>
            <CreateGame
                value={gameID}
                type="text"
                placeholder="Game ID"
            />
            <label for="homeTeam">Home Team:</label>
            <CreateGame
                value={homeTeam}
                type="text"
                placeholder="Equipa que joga em Casa"
            />
            <label for="awayTeam">Away Team:</label>
            <CreateGame
                value={awayTeam}
                type="text"
                placeholder="Equipa que joga fora de casa"
            />
            <label for="comenceTime">Início do jogo:</label>
            <CreateGame
                value={comenceTime}
                type="text"
                placeholder="Início do jogo"
            />
            <label for="odd">Odd do jogo:</label>
            <CreateGame
                value={odd}
                type="text"
                placeholder="Odd"
            />
        <button>Adicionar</button>
        </div>
    )
}