const { Bet } = require('../model/db/model.db')

exports.placeBet = async (req, res) => {
    const bets = req.body
    const userData = req.jwt

    bets.forEach(async bet => {
        const {
            gameId,
            oddId,
            value
        } = bet

        await Bet.create({
            userId: userData.id,
            gameId: gameId,
            oddId: oddId,
            total: value
        })
    })
    
    return res.status(200).json({
        status: true
    })
}