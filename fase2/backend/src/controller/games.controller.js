const gamesApi = require('../utils/apis')
const { Games, Odds } = require('../model/db/model.db')
// const { Odds } = require('../model/db/Odds')

const updateDbGames = async (gamesData) => {
    Object.values(gamesData).forEach(game => {
        Games.upsert({
            id: game.id,
            homeTeam: game.homeTeam,
            awayTeam: game.awayTeam,
            commenceTime: game.commenceTime,
            oddsKey: game.oddsKey,
            odds: Object.keys(game.odds).map(async oddKey => {
                const odd = game.odds[oddKey]
                return await Odds.upsert({
                    id: oddKey,
                    name: odd.name,
                    value: odd.value
                })
            })
        })
    })
}

exports.getGames = async (req, res) => {
    const gameFetchFunctions = {
      football: gamesApi.fetchFootballGames,
      basketball: gamesApi.fetchBasketballGames,
      // tenis: ,
      // motoGP: ,
    }

    const gamesData = await gameFetchFunctions[req.params.game]()

    // No await here because the client doesn't need to wait for this
    // to finish to continue
    updateDbGames(gamesData)
    
    return res.status(200).json(gamesData)
}