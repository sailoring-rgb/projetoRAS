import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/views/ChangeOddView.scss'
import { useUserAuth } from '../../hooks/useAuth';
import { updateOdd } from '../../utils/betsApis';
import { getAllGames } from '../../utils/gamesApi';
import { GamesSelectList } from '../blocks/GamesSelectList';
import { Input } from '../items/Input';

export const ChangeOddView = () => {
    const [ odd, setOdd ] = useState({})
    const [ newOdd, setNewOdd ] = useState(0)
    const [ game, setGame ] = useState({})
    const [error, setError] = useState('');
    const nav = useNavigate()

    const { signout } = useUserAuth()
    const [ gamesList, setGamesList ] = useState({})

    const fetchGamesList = async () => {
        const newGamesList = await getAllGames()
        if(newGamesList.name == 'Error') {
            switch(parseInt(newGamesList.message)) {
                case 401:
                case 403:
                    signout()
                    nav('/signin')
                default:
                console.log("An error occured")
            }
            return 
        }

        setGamesList(newGamesList)
    }

    const sendUpdateOddRequest = async () => {
        const newOddObj = {
            id: odd.id,
            value: newOdd,
        }
        const res = await updateOdd(newOddObj)
        if(res.name == 'Error') {
            switch(parseInt(res.message)) {
                case 401:
                case 403:
                    signout()
                    nav('/signin')
                default:
                console.log("An error occured")
            }
            return 
        }

        setOdd({})
        setGame({})
        setNewOdd(0)
        fetchGamesList()
    }

    useEffect(() => {
        fetchGamesList()
    }, [])

    useEffect(() => {
        setNewOdd(odd.value)
    }, [odd])
    
    return (
        <div className='change-odd-container'> 
            <GamesSelectList
                odd={odd}
                gamesList={gamesList}
                setSelectedOdd={setOdd}
                setGamesList={setGamesList}
                setSelectedGame={setGame}/>

            <form onSubmit={e => e.preventDefault()}>
                <h1>Alterar odd de um evento desportivo</h1>
                <h3>{ game.homeTeam } - { game.awayTeam } ({ odd.name === 'Draw' ? 'Empate': odd.name })</h3>
                <div class="row">
                    <label>Odd do jogo:</label>
                    <Input
                        value={newOdd}
                        type="text"
                        placeholder="Odd"
                        onChange={(e) => [ setNewOdd(e.target.value), setError('') ]}
                    />
                </div>

                { error.trim() !== '' && <label className='error-label'>{error}</label>}
                <button onClick={sendUpdateOddRequest}>Alterar</button>
            </form>
        </div>
    )
}