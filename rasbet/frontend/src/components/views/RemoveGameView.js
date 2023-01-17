import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/views/FormView.scss'
import { useUserAuth } from '../../hooks/useAuth';
import { deleteGame, getAllGames } from '../../utils/gamesApi';
import { GamesSelectList } from '../blocks/GamesSelectList';
import '../../css/views/RemoveGameView.scss'

export const RemoveGameView = () => {
    const [ error, setError ] = useState("");
    const [ gamesList, setGamesList ] = useState({})
    const { signout } = useUserAuth()
    const [ game, setGame ] = useState(null)
    const nav = useNavigate()

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

    const parseTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const currDate = new Date();
        const currDayString = `${currDate.getDate()}/${currDate.getMonth()+1}/${currDate.getFullYear()}`;
        const dayString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        const hourString = `${String(date.getHours()).padStart(
            2,
            "0"
        )}:${String(date.getMinutes()).padStart(2, "0")}`;

        return currDayString === dayString
            ? `Hoje  ${hourString}`
            : `${dayString}  ${hourString}`;
    };
    
    useEffect(() => {
        fetchGamesList()
    }, [])

    const sendDeleteRequest = async () => {
        const res = await deleteGame(game.id)
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

        setGame(null)
        fetchGamesList()
    }

    return (
        <div className='remove-game-container'> 
            <GamesSelectList
                gamesList={gamesList}
                setSelectedOdd={()=>{}}
                setGamesList={setGamesList}
                setSelectedGame={setGame}
                showOdds={false}
                setGame={setGame}
                showFollow={false}
            />

            <form onSubmit={e => e.preventDefault()}>
                <h1>Remover evento desportivo</h1>
                { game !== null &&  <p>Remover o jogo { game.homeTeam } - { game.awayTeam } às { parseTimestamp(game.commenceTime) }?</p> }
               

                { error.trim() !== '' && <label className='error-label'>{error}</label>}
                <button onClick={sendDeleteRequest}>Remover</button>
            </form>
        </div>
    )
}