import { useState, useEffect } from 'react'
import { getFootballGames } from '../../utils/api.js'
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
  const [ gamesList, setGamesList ] = useState([])
  const [ displayPaymentModal, setDisplayPaymentModal ] = useState(false)

  const fetchGamesList = async () => {
    let newGamesList = []
    switch(game) {
      case 'football':
        newGamesList = await getFootballGames();
    }

    setGamesList(newGamesList)
  }

  useEffect(() => {
    fetchGamesList()
  }, [])

  return (
    <main className="container">
      <GamesList
        game={game}
        gamesList={gamesList}
        setGamesList={setGamesList}
        betsList={betsList}
        setBetsList={setBetsList}
      />
      
      { displayPaymentModal &&
        <PaymentModal bets={betsList} closeModal={() => setDisplayPaymentModal(false)}/>
      }

      <BetsList
        gamesList={gamesList}
        setGamesList={setGamesList}
        betsList={betsList}
        setBetsList={setBetsList}
        setDisplayPaymentModal={setDisplayPaymentModal}
      />

    </main>
  );
}

export default GamesListView;
