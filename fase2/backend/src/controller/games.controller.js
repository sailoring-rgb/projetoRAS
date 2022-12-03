const gamesApi = require('../utils/apis')
const { Games, Odds } = require('../model/db/model.db')
// const { Odds } = require('../model/db/Odds')

const updateDbGames = async (gamesData) => {
    console.log(gamesData)
    // const registeredGames = await Games.findAll({
    //     where: {
    //         id: Object.keys(gamesData)
    //     }
    // })

    // registeredGames.forEach(game => {
    //     game.upsert({

    //     })
    // })

    Object.values(gamesData).forEach(game => {
        // game = game.dataValues
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

    updateDbGames(gamesData)
    
    return res.status(200).json(gamesData)
}