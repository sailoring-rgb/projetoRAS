import React, { useState } from 'react';
import '../../css/views/BetStateView.scss'

export const BetStateView = () => {
    const [ gameID, setGameID] = useState('')
    const [ betState, setBetState ] = useState('')
    const [ error, setError ] = useState("")
    
    return (
        <div className='bet-state-container'> 
            <form>
                <div class="row">
                    <div class="col-25">
                        <label for="GameID">Game ID:</label>
                    </div>
                    <input
                        value={gameID}
                        type="text"
                        placeholder="Game ID"
                        onChange={(e) => [ setGameID(e.target.value), setError("") ]}
                    />
                </div>

                <div class="row">
                    <div class="col-25">
                        <label for="betState">Estado da aposta:</label>
                    </div>
                    <input
                        value={betState}
                        type="text"
                        placeholder="Estado da aposta"
                        onChange={(e) => [ setBetState(e.target.value), setError("") ]}
                    />
                </div>

                { error.trim() !== '' && <label className='error-label'>{error}</label>}
                <button>Alterar</button>
            </form>
        </div>
    )
}