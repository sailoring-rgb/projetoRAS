import React, { useState } from 'react';
import '../../css/views/RemoveGameView.scss'

export const RemoveGameView = () => {
    const [ sport, setSport ] = useState('')
    const [ gameID, setGameID ] = useState('')
    
    return (
        <div className='remove-game-container'> 
            <div class="row">
                <div class="col-25">
                    <label for="sport">Desporto:</label>
                </div>
                <div>
                    <input
                    value={sport}
                    type="text"
                    placeholder="Desporto"
                    onChange={(e) => [setSport(e.target.value), setError("")]}
                    />
                </div>                        
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="gameID">Game ID:</label>
                </div>
                <div>
                    <input
                    value={gameID}
                    type="text"
                    placeholder="Game ID"
                    onChange={(e) => [setGameID(e.target.value), setError("")]}
                    />
                </div>                        
            </div>
            <button>Remover</button>
        </div>
    )
}