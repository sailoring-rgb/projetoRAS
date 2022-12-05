import React, { useState } from 'react';
import { CreateGame} from "../items/CreateGame"
import '../../css/views/CreateGameView.scss'

export const CreateGameView = () => {
    const [ gameID, setGameId ] = useState('')
    const [ homeTeam, setHomeTeam ] = useState('')
    const [ awayTeam, setAwayTeam ] = useState('')
    const [ comenceTime, setComenceTime ] = useState('')
    const [ odd, setOdd ] = useState('')
    const [ error, setError ] = useState('');
    
    return (
        <div className='create-game-container'> 
            <form>
                <div class="row">
                    <div class="col-25">
                        <label for="GameID">Game ID:</label>
                    </div>
                        <CreateGame
                            value={gameID}
                            type="text"
                            placeholder="Game ID"
                            onChange={(e) => [setGameId(e.target.value), setError("")]}
                        />
                </div>

                <div class="row">
                    <div class="col-25">
                        <label for="homeTeam">Home Team:</label>
                    </div>
                    <CreateGame
                        value={homeTeam}
                        type="text"
                        placeholder="Equipa que joga em Casa"
                        onChange={(e) => [setHomeTeam(e.target.value), setError("")]}
                    />
                </div>

                <div class="row">
                    <div class="col-25">
                        <label for="awayTeam">Away Team:</label>
                    </div>
                    <CreateGame
                        value={awayTeam}
                        type="text"
                        placeholder="Equipa que joga fora de casa"
                        onChange={(e) => [setAwayTeam(e.target.value), setError("")]}
                    />
                </div>

                <div class="row">
                    <div class="col-25">
                        <label for="comenceTime">Início do jogo:</label>
                    </div>
                    <CreateGame
                        value={comenceTime}
                        type="text"
                        placeholder="Início do jogo"
                        onChange={(e) => [setComenceTime(e.target.value), setError("")]}
                    />
                </div>

                <div class="row">
                    <div class="col-25">
                        <label for="odd">Odd do jogo:</label>
                    </div>
                    <CreateGame
                        value={odd}
                        type="text"
                        placeholder="Odd"
                        onChange={(e) => [setOdd(e.target.value), setError("")]}
                    />
                </div>

                { error.trim() !== '' && <label className='error-label'>{error}</label>}
                <button>Adicionar</button>
            </form>
        </div>
    )
}