const gamesApi = require('../utils/apis')
const { Game, Odd, User } = require('../model/db/model.db')
const crypto = require('crypto');

// const { Odds } = require('../model/db/Odds')

class GamesController {
    updateDbGames = () => {
        const gameFetchFunctions = {
            football: gamesApi.fetchFootballGames,
            //   basketball: gamesApi.fetchBasketballGames,
        }

        Object.keys(gameFetchFunctions).forEach(async gameType => {
            const gamesData = await gameFetchFunctions[gameType]()

            Object.values(gamesData).forEach(async game => {
                try {
                    const newGame = (await Game.create({
                        id: game.id,
                        homeTeam: game.homeTeam,
                        awayTeam: game.awayTeam,
                        commenceTime: game.commenceTime,
                        oddsKey: game.oddsKey,
                        gameType: gameType.toUpperCase(),
                        deleted: false
                    }))
            
                    Object.keys(game.odds).map(async oddKey => {
                        const odd = game.odds[oddKey]
                        return await Odd.create({
                            id: oddKey,
                            name: odd.name,
                            value: odd.value,
                            gameId: newGame.dataValues.id
                        }, { include: [ Game ] })
                    })
                } catch(e) { }
            })
            console.log("[CONTROLLER] Games updated on DB")
        })
    }

    getGameById = async (req, res) => {
        const { gameId } = req.params

        const game = await Game.findByPk(gameId)

        return res.status(200).json({ game: game.dataValues })
    }

    createGame = async (req, res) => {
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

    getGames = async (req, res) => {
        const { game } = req.params
        const userData = req.jwt
        console.log("[GETTING] " + game)

        let followedGames = (await User.findByPk(userData.id, {
            include: Game
        }))
        
        if(followedGames)
            followedGames = followedGames.dataValues.games.map(game => game.id)
        else
            followedGames = []
       
        // First fetch the existing data in the db since it's faster
        let gamesData;
        if(game.toUpperCase() === 'ALL')
            gamesData = await Game.findAll({
                where: { deleted: false },
                order: [
                    ['commenceTime', 'ASC']
                ]
            })
        else
            gamesData = await Game.findAll({
                where: {
                    gameType: game.toUpperCase(),
                    deleted: false
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
            const isFollowed = followedGames.includes(game.id)

            return {
                ...game.dataValues,
                odds,
                followed: isFollowed
            }
        }))

        // Then fetches the apis and updates the games in the db in async mode
        // so the client doensn't have to wait as much
        // updateDbGames(game)
        
        return res.status(200).json(gamesData)
    }

    followGame = async (req, res) => {
        const { gameId } = req.body
        const userData = req.jwt
        let isFollowed;

        try {
            const user = await User.findByPk(userData.id, { include: Game })
            const userValues = user.dataValues
            const isGameFollowedByUser = userValues.games.filter(game => game.id === gameId).length > 0
            
            if(isGameFollowedByUser) {
                const game = await Game.findByPk(gameId)
                await user.removeGame(game)
                isFollowed = false
            } else {
                await user.addGame(gameId)
                isFollowed = true
            }
        } catch(e) {
            return res.status(500).json({
                status: false
            })
        }

        return res.status(200).json({
            status: true,
            isFollowed
        })
    }

    deleteGame = async (req, res) => {
        const { gameId } = req.body
        const userData = req.jwt

        if(userData.type !== 'SPECIALIST')
            return res.status(401).json({
                status: false
            })

        try {
            const game = await Game.findByPk(gameId)
            await game.update({ deleted: true })
            await game.save()
        } catch(e) {
            return res.status(500).json({
                status: false
            })
        }

        return res.status(200).json({
            status: true
        })
    }
}

exports.GamesController = GamesController