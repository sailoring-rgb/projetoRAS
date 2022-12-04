import React, { useState } from 'react';
import { CreateGame} from "../items/CreateGame"
import { NavBar } from "../blocks/NavBar";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import '../../css/views/CreateGameView.scss'

export const ChangeOddView = () => {
    const [ gameID, setGameId ] = useState('')
    const [ odd, setOdd ] = useState('')
    const [error, setError] = useState("");
    
    return (
        <div>
            <div className='nav-container'>
                <NavBar />
            </div>
            <div className='create-game-container'> 
                <form action="action_page.php">
                    <div class="row">
                        <div class="col-25">
                            <label for="GameID">Game ID:</label>
                        </div>
                        <div>
                            <CreateGame
                            value={gameID}
                            type="text"
                            placeholder="Game ID"
                            onChange={(e) => [setGameId(e.target.value), setError("")]}
                            />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-25">
                            <label for="odd">Odd do jogo:</label>
                        </div>
                        <div>
                            <CreateGame
                            value={odd}
                            type="text"
                            placeholder="Odd"
                            onChange={(e) => [setOdd(e.target.value), setError("")]}
                            />
                        </div>
                    </div>
                </form>
                <button>Adicionar</button>
            </div>
        </div>
    )
}