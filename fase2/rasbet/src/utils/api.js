import { Game } from '../models/Game.js'

export const getFootballGames = async () => {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/games`)
        .then(res => res.json());
    const games = {}

    data.forEach(game => {
        const oddsListKey = game.bookmakers[0].markets[0].key
        const newGame = new Game(
            game.id,
            game.homeTeam,
            game.awayTeam,
            game.commenceTime,
            oddsListKey
        )
        // {
        //     id: game.id,
        //     homeTeam: game.homeTeam,
        //     awayTeam: game.awayTeam,
        //     commenceTime: game.commenceTime,
        //     oddsKey: oddsListKey,
        //     odds: {}
        // }

        game.bookmakers[0].markets[0].outcomes.forEach(odd => {
            newGame.odds[game.id + '_' + odd.name] = {
                name: odd.name,
                value: odd.price,
                selected: false
            }
        })

        // games.push(newGame)
        games[game.id] = newGame
    });

    return games
};