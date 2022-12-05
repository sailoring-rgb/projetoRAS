import React, { useState } from 'react';
import '../../css/views/BetStateView.scss'

function BetStateView ({}) {
    const [ gameID, setGameID] = useState('')
    const [ betState, setBetState ] = useState('')
    const [error, setError] = useState("");
    
    return (
        <div className='bet-state-container'> 
            <form action="action_page.php">
                <div class="row">
                    <div class="col-25">
                        <label for="GameID">Game ID:</label>
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

                <div class="row">
                    <div class="col-25">
                        <label for="betState">Estado da aposta:</label>
                    </div>
                    <div>
                        <input
                        value={betState}
                        type="text"
                        placeholder="Estado da aposta"
                        onChange={(e) => [setBetState(e.target.value), setError("")]}
                        />
                    </div>
                </div>
            </form>
            <button>Alterar</button>
        </div>
    )
}

export default BetStateView;