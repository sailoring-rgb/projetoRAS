const gamesApi = require('../utils/apis')
const { Game, Odd, User } = require('../model/db/model.db')
const crypto = require('crypto');

// const { Odds } = require('../model/db/Odds')

exports.updateDbGames = () => {
    const gameFetchFunctions = {
      football: gamesApi.fetchFootballGames,
    //   basketball: gamesApi.fetchBasketballGames,
    }

    Object.keys(gameFetchFunctions).forEach(async gameType => {
        const gamesData = await gameFetchFunctions[gameType]()

        Object.values(gamesData).forEach(async game => {
            const newGame = (await Game.upsert({
                id: game.id,
                homeTeam: game.homeTeam,
                awayTeam: game.awayTeam,
                commenceTime: game.commenceTime,
                oddsKey: game.oddsKey,
                gameType: gameType.toUpperCase()
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
        console.log("[CONTROLLER] Games updated on DB")
    })
}

exports.getGameById = async (req, res) => {
    const { gameId } = req.params

    const game = await Game.findByPk(gameId)

    return res.status(200).json({ game: game.dataValues })
}

exports.createGame = async (req, res) => {
    const { gameData } = req.body
    console.log(req.body)
    console.log(gameData)

    try {
        const randomUUID = crypto.randomUUID()
        const utcCommenceTime = new Date(gameData.commenceTime).toISOString()
        console.log("=>", utcCommenceTime)
        const newGame = (await Game.create({
            id: randomUUID,
            homeTeam: gameData.homeTeam,
            awayTeam: gameData.awayTeam,
            commenceTime: utcCommenceTime,
            gameType: gameData.gameType,
            oddsKey: 'manual'
        }))

        console.log(newGame)

        if(!newGame) return res
            .status(500)
            .json({ status: false, message: "Erro ao criar jogo" })
    
        gameData.odds.map(async odd => {
            console.log(odd)
            return await Odd.create({
                id: `${newGame.dataValues.id}_${odd.name}`,
                name: odd.name,
                value: odd.value,
                gameId: newGame.dataValues.id
            }, { include: [ Game ] })
        })
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            status: false,
            message: "An error occured"
        })
    }

    return res.status(200).json({
        status: true
    })
}

exports.getGames = async (req, res) => {
    const { game } = req.params
    console.log("[GETTING] " + game)

    // First fetch the existing data in the db since it's faster
    let gamesData = await Game.findAll({
        where: {
            gameType: game.toUpperCase(),
        },
        order: [
            ['commenceTime', 'ASC']
        ]
    })

    gamesData = await Promise.all(await gamesData.map(async game => {
        const odds = {}
        const dbOdds = await Odd.findAll({ where: { gameId: game.id }})
        dbOdds.forEach(odd => {
            odd = odd.dataValues
            odds[game.id + '_' + odd.name] = odd
        })

        return {
            ...game.dataValues,
            odds
        }
    }))

    // Then fetches the apis and updates the games in the db in async mode
    // so the client doensn't have to wait as much
    // updateDbGames(game)
    
    return res.status(200).json(gamesData)
}

exports.followGame = async (req, res) => {
    const { gameId } = req.body
    const userData = req.jwt

    const user = await User.findByPk(userData.id)
    
    await user.addGame(gameId)

    return res.status(200).json("Ok")
}

