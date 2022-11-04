import { useState, useEffect } from 'react'
import { getGames } from '../../utils/api.js'
import '../../css/views/GamesList.scss'
import { GameCard } from '../items/GameCard.js'
import { BetCard } from '../items/BetCard.js'
import { PaymentModal } from '../blocks/PaymentModal.js'

function GamesList() {
  const [ betsList, setBetsList ] = useState([])
  const [ gamesList, setGamesList ] = useState([])
  const [ searchText, setSearchText ] = useState('')
  const [ betTotal, setBetTotal ] = useState(0.0)
  const [ selectedBet, setSelectedBet ] = useState(null)
  const [ displayPaymentModal, setDisplayPaymentModal ] = useState(false)

  const fetchGamesList = async () => {
    const newGamesList = await getGames();
    setGamesList(newGamesList)
  }

  const onSearchTextChange = (e) => {
    setSearchText(e.target.value)
  }

  const selectOdd = (gameId, odd) => {
    let newBets = [...betsList]
    let updatedGames = gamesList
    const tmpGame = updatedGames[gameId]
    const oddId = tmpGame.id + '_' + odd.name
    tmpGame.odds[oddId].selected = !tmpGame.odds[oddId].selected

    updatedGames[tmpGame.id] = tmpGame

    if(tmpGame.odds[oddId].selected) {
      const newBet = {
        id: oddId,
        gameName: `${tmpGame.homeTeam} - ${tmpGame.awayTeam}`,
        result: odd.name,
        odd: odd.value,
        total: 0.0
      }
      newBets.push(newBet)
    } else
      newBets = newBets.filter(bet => bet.id !== oddId)

    let newBetTotal = 0.0
    newBets.forEach(bet => { newBetTotal += bet.total * bet.odd })

    setBetTotal(newBetTotal.toFixed(2))
    setGamesList(updatedGames)
    setBetsList(newBets)
  }

  const removeBet = (betId) => {
    const updatedBetsList = [...betsList].filter(bet => bet.id !== betId)
    let totalWinnings = 0
    updatedBetsList.forEach(bet => {
      totalWinnings += bet.total * bet.odd
    })

    const updatedGames = gamesList
    const [ gameId, _ ] = betId.split('_')
    updatedGames[gameId].odds[betId].selected = !updatedGames[gameId].odds[betId].selected

    setBetsList(updatedBetsList)
    setGamesList(updatedGames)
    setBetTotal(totalWinnings.toFixed(2))
  }

  const onSelectedBetValueChange = (e) => {
    let updatedBetValue = e.currentTarget.value
    let selectedBetIndex = 0;
    let totalWinnings = 0;

    const updatedBetsList = [ ...betsList ].map((bet, i) => {
      if(bet.id === selectedBet.id) {
        if(updatedBetValue !== '')
          bet.total = parseFloat(updatedBetValue)
        selectedBetIndex = i
      }

      totalWinnings += bet.total * bet.odd
      return bet
    })

    setBetsList(updatedBetsList)
    setSelectedBet(updatedBetsList[selectedBetIndex])
    setBetTotal(totalWinnings.toFixed(2))
  }

  const openPaymentModal = () => {
    if(betTotal > 0)
      setDisplayPaymentModal(true)
  }

  useEffect(() => {
    fetchGamesList()
  }, [])

  return (
    <main className="container">
      <div className='gameslist-container'>
        <div className='searchbar-container'>
          <input
            onChange={onSearchTextChange}
            type="text"
            placeholder='Pesquisar'
            value={searchText}/>
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
      
      { displayPaymentModal &&
        <PaymentModal bets={betsList} closeModal={() => setDisplayPaymentModal(false)}/>
      }

      <div className='betlist-container'>
        <h2>Boletim</h2>
        
        <div className='joint-btn'>
          <button>Simples</button>
          <button>Múltipla</button>
        </div>

        <div className='bets-list'>
          { betsList.map(bet =>
              <BetCard
                key={bet.id}
                bet={bet}
                onRemoveBetClick={removeBet}
                onCardClick={setSelectedBet} />)
          }
        </div>
        
        <div className='bottom-container'>
          
          { selectedBet && 
            <div className='flex-horizontal'>
              <div className='bet-odd-label'>
                Cota: { selectedBet.odd }
              </div>
              <table className='price-container'>
                <tbody>
                  <tr>
                    <td><label>Montante</label></td>
                    <td>
                      <input pattern="[0-9]*"
                        type="number"
                        value={ selectedBet.total }
                        onChange={ onSelectedBetValueChange }/>€
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
         
          <div className='flex-horizontal'>
            <div className='totalWins'>
              <label>Total de ganhos</label>
              <label className='orange-text'>{ betTotal }€</label>
            </div>
            <button
              disabled={betTotal <= 0}
              onClick={openPaymentModal}>Apostar</button>
          </div>

        </div>
      </div>
    </main>
  );
}

export default GamesList;
