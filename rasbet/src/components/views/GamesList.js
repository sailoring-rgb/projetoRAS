import { useState, useEffect } from 'react'
import { getGames } from '../../utils/api.js'
import '../../css/views/GamesList.scss'
import { GameCard } from '../items/GameCard.js'
import { BetCard } from '../items/BetCard.js'

function GamesList() {
  const [ betsList, setBetsList ] = useState([
    {
      gameName: 'AAC - Benfica',
      result: 'AAC', // xD
      odd: 13.2
    }, {
      gameName: 'Sporting - Benfica',
      result: 'Benfica', // xD
      odd: 1.2
    }, {
      gameName: 'AAC - Porto',
      result: '_DRAW_', // xD
      odd: 23.1
    }
  ])
  const [ gamesList, setGamesList ] = useState([])

  const fetchGamesList = async () => {
    const newGamesList = await getGames();
    setGamesList(newGamesList)
    console.log("=>", newGamesList)
  }

  useEffect(() => {
    fetchGamesList()
  }, [])

  return (
    <main className="container">
      <div className='gameslist-container'>
        <div className='searchbar-container'>
          <input type="text"/>
        </div>
        <div className='gameslist'>
          {
            gamesList.map(game => 
              <GameCard game={game} />
            )
          }
        </div>

      </div>

      <div className='betlist-container'>
        <h2>Boletim</h2>
        
        <div className='joint-btn'>
          <button>Simples</button>
          <button>Múltipla</button>
        </div>

        <div className='bets-list'>
          { betsList.map(bet =>
            <BetCard bet={bet} />
          )}
        </div>
        
        <div className='bottom-container'>
          <div className='totalWins'>
            <label>Total de ganhos</label>
            <label>xxx€</label>
          </div>
          <button>Apostar</button>
        </div>
      </div>
    </main>
  );
}

export default GamesList;
