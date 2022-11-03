import { useState, useEffect } from 'react'
import { getGames } from '../../utils/api.js'

function GamesList() {
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
    <div className="GamesList">
      <table>
        <thead>

        </thead>

        <tbody>
          {
            gamesList.map(game => 
              <tr>
                <td>{game.homeTeam}</td>
                vs
                <td>{game.awayTeam}</td>
              </tr>)
          }
        </tbody>
      </table>
    </div>
  );
}

export default GamesList;
