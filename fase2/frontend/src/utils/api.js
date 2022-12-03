import { Game } from '../models/Game.js'

const parseGame = (gameData) => {
    const games = {}

    Object.keys(gameData).forEach(gameId => {
        const game = gameData[gameId]

        const newGame = new Game(
            game.id,
            game.homeTeam,
            game.awayTeam,
            game.commenceTime,
            game.oddsKey
        )

        Object.keys(game.odds).forEach(oddId => {
            const odd = game.odds[oddId]
            newGame.odds[oddId] = {
                name: odd.name,
                value: odd.price,
                selected: false
            }
        })

        // games.push(newGame)
        games[game.id] = newGame
    })

    return games
}

export const getFootballGames = async () => {
    const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/games/football/`)
        .then(res => res.json());
    return parseGame(data)
}

export const getBasketballGames = async () => {
    const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/games/basketball/`)
        .then(res => res.json());
    return parseGame(data)
}