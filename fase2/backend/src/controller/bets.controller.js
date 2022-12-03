const gamesApi = require('../utils/apis')
const { Bets, Users } = require('../model/db/model.db')

exports.placeBet = async (req, res) => {
    const bets = req.body

    bets.forEach(async bet => {
        const {
            gameId,
            oddId,
            value
        } = bet

        await Bets.create({
            // id: betId, 
            userId: 123,
            gameId: gameId,
            oddId: oddId,
            total: value
        })
    })
    
    return res.status(200).json({
        status: true
    })
}