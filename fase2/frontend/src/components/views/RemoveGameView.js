import React, { useState } from 'react';
import '../../css/views/RemoveGameView.scss'

export const RemoveGameView = () => {
    const [ sport, setSport ] = useState('')
    const [ gameID, setGameID ] = useState('')
    const [error, setError] = useState("");
    
    return (
        <div className='remove-game-container'>             
            <form>
                <div class="row">
                    <div class="col-25">
                        <label for="sport">Desporto:</label>
                    </div>
                    <input
                        value={sport}
                        type="text"
                        placeholder="Desporto"
                        onChange={(e) => [setSport(e.target.value), setError("")]}
                        />
                </div>

                <div class="row">
                    <div class="col-25">
                        <label for="gameID">Game ID:</label>
                    </div>
                    <input
                        value={gameID}
                        type="text"
                        placeholder="Game ID"
                        onChange={(e) => [setGameID(e.target.value), setError("")]}
                        />
                </div>

                { error.trim() !== '' && <label className='error-label'>{error}</label>}
                <button>Remover</button>
            </form>
        </div>
    )
}