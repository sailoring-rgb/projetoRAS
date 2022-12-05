import React, { useState } from 'react';
import '../../css/views/ChangeOddView.scss'

export const ChangeOddView = () => {
    const [ gameID, setGameId ] = useState('')
    const [ odd, setOdd ] = useState('')
    const [error, setError] = useState('');
    
    return (
        <div className='change-odd-container'> 
            <form>
                <div class="row">
                    <div class="col-25">
                        <label for="GameID">Game ID:</label>
                    </div>
                    <input
                        value={gameID}
                        type="text"
                        placeholder="Game ID"
                        onChange={(e) => [ setGameId(e.target.value), setError('') ]}
                    />
                </div>

                <div class="row">
                    <div class="col-25">
                        <label for="odd">Odd do jogo:</label>
                    </div>
                    <input
                        value={odd}
                        type="text"
                        placeholder="Odd"
                        onChange={(e) => [ setOdd(e.target.value), setError('') ]}
                    />
                </div>

                { error.trim() !== '' && <label className='error-label'>{error}</label>}
                <button>Alterar</button>
            </form>
        </div>
    )
}