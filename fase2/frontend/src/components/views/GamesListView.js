import { useState, useEffect, useCallback } from 'react'
import { getFootballGames, getBasketballGames } from '../../utils/api.js'
import '../../css/views/GamesListView.scss'
import { PaymentModal } from '../blocks/PaymentModal.js'
import { BetsList } from '../blocks/BetsList.js'
import { GamesList } from '../blocks/GamesList.js'
// import { useStateValue } from '../../state';

/*
Future todo:
  - Use barrels
*/
function GamesListView({game}) {
  // const { state, dispatch } = useStateValue();
  // const { betsList } = state;
  const [ betsList, setBetsList ] = useState([])
  const [ gamesList, setGamesList ] = useState({})
  const [ displayPaymentModal, setDisplayPaymentModal ] = useState(false)

  const fetchGamesList = useCallback(async () => {
    let newGamesList = []
    switch(game) {
      case 'football':
        newGamesList = await getFootballGames()
        break
      case 'basketball':
        newGamesList = await getBasketballGames()
        break
      default:
    }
    console.log(newGamesList)
    const currGamesList = { ...gamesList }
    currGamesList[game] = newGamesList
    setGamesList(currGamesList)
  }, [game])

  const clearBets = () => {
    setBetsList([])
  }

  useEffect(() => {
    fetchGamesList()
    clearBets()
  }, [game, fetchGamesList])

  const updateGamesList = newGamesList => {
    const currGamesList = { ...gamesList }
    currGamesList[game] = newGamesList
    setGamesList(currGamesList)
  }

  return (
    <main className="container">
      <GamesList
        game={game}
        gamesList={gamesList[game]}
        setGamesList={updateGamesList}
        betsList={betsList}
        setBetsList={setBetsList}
      />
      
      { displayPaymentModal &&
        <PaymentModal bets={betsList} closeModal={() => setDisplayPaymentModal(false)}/>
      }

      <BetsList
        game={game}
        gamesList={gamesList[game]}
        setGamesList={updateGamesList}
        betsList={betsList}
        setBetsList={setBetsList}
        setDisplayPaymentModal={setDisplayPaymentModal}
      />

    </main>
  );
}

export default GamesListView;
