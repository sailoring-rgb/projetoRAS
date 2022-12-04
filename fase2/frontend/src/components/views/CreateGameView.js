import React, { useState } from 'react';
import { CreateGame} from "../items/CreateGame"
import { NavBar } from "../blocks/NavBar";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import '../../css/views/CreateGameView.scss'

export const CreateGameView = () => {
    const [ gameID, setGameId ] = useState('')
    const [ homeTeam, setHomeTeam ] = useState('')
    const [ awayTeam, setAwayTeam ] = useState('')
    const [ comenceTime, setComenceTime ] = useState('')
    const [ odd, setOdd ] = useState('')
    const [error, setError] = useState("");
    
    return (
        <div className='create-game-container'> 
            <NavBar />
            <label for="GameID">Game ID:</label>
            <CreateGame
                value={gameID}
                type="text"
                placeholder="Game ID"
                onChange={(e) => [setGameId(e.target.value), setError("")]}
            />
            <label for="homeTeam">Home Team:</label>
            <CreateGame
                value={homeTeam}
                type="text"
                placeholder="Equipa que joga em Casa"
                onChange={(e) => [setHomeTeam(e.target.value), setError("")]}
            />
            <label for="awayTeam">Away Team:</label>
            <CreateGame
                value={awayTeam}
                type="text"
                placeholder="Equipa que joga fora de casa"
                onChange={(e) => [setAwayTeam(e.target.value), setError("")]}
            />
            <label for="comenceTime">Início do jogo:</label>
            <CreateGame
                value={comenceTime}
                type="text"
                placeholder="Início do jogo"
                onChange={(e) => [setComenceTime(e.target.value), setError("")]}
            />
            <label for="odd">Odd do jogo:</label>
            <CreateGame
                value={odd}
                type="text"
                placeholder="Odd"
                onChange={(e) => [setOdd(e.target.value), setError("")]}
            />
        <button>Adicionar</button>
        </div>
    )
}