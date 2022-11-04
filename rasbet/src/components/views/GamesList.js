import { useState, useEffect } from 'react'
import { getGames } from '../../utils/api.js'
import '../../css/views/GamesList.scss'
import { GameCard } from '../items/GameCard.js'
import { BetCard } from '../items/BetCard.js'

function GamesList() {
  const [ betsList, setBetsList ] = useState([])
  const [ gamesList, setGamesList ] = useState([])
  const [ searchText, setSearchText ] = useState('')

  const fetchGamesList = async () => {
    const newGamesList = await getGames();
    setGamesList(newGamesList)
    console.log("=>", newGamesList)
  }

  const onSearchTextChange = (e) => {
    setSearchText(e.target.value)
    console.log(searchText)
  }

  const selectOdd = (gameId, odd) => {
    let newBets = [...betsList]
    let updatedGames = gamesList
    const tmpGame = updatedGames[gameId]
    const oddId = tmpGame.oddsKey + odd.name
    tmpGame.odds[oddId].selected = !tmpGame.odds[oddId].selected

    updatedGames[tmpGame.id] = tmpGame

    if(tmpGame.odds[oddId].selected) {
      const newBet = {
        id: `${tmpGame.homeTeam}${tmpGame.awayTeam}${odd.name}`,
        gameName: `${tmpGame.homeTeam} - ${tmpGame.awayTeam}`,
        result: odd.name,
        odd: odd.value
      }
      newBets.push(newBet)
      console.log(newBet)
    } else
      newBets = newBets.filter(bet => bet.id !== `${tmpGame.homeTeam}${tmpGame.awayTeam}${odd.name}`)

    console.log(tmpGame, newBets)

    setGamesList(updatedGames)
    setBetsList(newBets)
  }

  useEffect(() => {
    fetchGamesList()
  }, [])

  return (
    <main className="container">
      <div className='gameslist-container'>
        <div className='searchbar-container'>
          <input onChange={onSearchTextChange} type="text" value={searchText}/>
        </div>
        <div className='gameslist'>
          {
            gamesList &&
            Object.values(gamesList).map((game, i) => 
              <GameCard key={i} game={game} onOddClick={selectOdd} />
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
              <BetCard key={bet.id} bet={bet} />)
          }
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
