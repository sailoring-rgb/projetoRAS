const gamesApi = require('../utils/apis')
const { Game, Odd } = require('../model/db/model.db')
// const { Odds } = require('../model/db/Odds')

const updateDbGames = async (gamesData) => {
    Object.values(gamesData).forEach(async game => {
        const newGame = (await Game.upsert({
            id: game.id,
            homeTeam: game.homeTeam,
            awayTeam: game.awayTeam,
            commenceTime: game.commenceTime,
            oddsKey: game.oddsKey,
        }))[0]

        Object.keys(game.odds).map(async oddKey => {
            const odd = game.odds[oddKey]
            return await Odd.upsert({
                id: oddKey,
                name: odd.name,
                value: odd.value,
                gameId: newGame.dataValues.id
            }, { include: [ Game ] })
        })
    })
}

exports.getGames = async (req, res) => {
    console.log(req.jwt)
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