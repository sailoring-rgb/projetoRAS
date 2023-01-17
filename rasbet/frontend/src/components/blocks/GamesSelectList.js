import { useEffect, useState } from 'react'
import { GameCard } from '../items/GameCard'
import '../../css/blocks/GamesList.scss'

export const GamesSelectList = ({
    gamesList,
    setGamesList,
    setGame,
    setSelectedOdd,
    setSelectedGame,
    showFollow=true,
    showOdds=true
}) => {
    const [ searchText, setSearchText ] = useState('')

    const onSearchTextChange = (e) => {
        setSearchText(e.target.value)
    }

    const selectOdd = (gameId, odd) => {
        let updatedGames = gamesList
        const tmpGame = updatedGames[gameId]
        // const oddId = tmpGame.id + '_' + odd.name

        Object.keys(updatedGames).forEach(g => {
            const game = updatedGames[g]
            Object.keys(game.odds).forEach(k => {
                if(k === odd.id && g === gameId)
                    game.odds[k].selected = true
                else
                    game.odds[k].selected = false
            })
        })
        

        updatedGames[tmpGame.id] = tmpGame

        setGamesList(updatedGames)
        // dispatch({ type: 'setBetsList', value: newBets })
        setSelectedOdd(odd)
        setSelectedGame(tmpGame)
    }

    const followGame = (gameId, isFollowed) => {
        let tmpGameList = { ...gamesList }
        tmpGameList[gameId].isFollowed = isFollowed
        setGamesList(tmpGameList)
    }

    useEffect(() => {
        console.log(gamesList)
    }, [gamesList])

    return (
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
                (gamesList && Object.values(gamesList).length > 0) ?
                    Object.values(gamesList).map((game, i) => 
                        <div onClick={() => setGame(game)}>
                            <GameCard
                                key={i}
                                game={game}
                                onOddClick={selectOdd}
                                followGameClick={followGame}
                                showOdds={showOdds}
                                showFollow={showFollow}
                            />
                        </div>
                    )
                : <label className='no-games-label'>Sem jogos disponíveis</label>
                }
            </div>
        
      </div>
    )
}