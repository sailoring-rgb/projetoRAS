const { Bet, MbWayPayment, CardPayment, Odd, Game } = require('../model/db/model.db')

exports.getBetsHistory = async (req, res) => {
    const userData = req.jwt
    const dbBets = await Bet.findAll({
        where: {
            userId: userData.id
        },
        order: [    
            ['createdAt', 'DESC'],
        ],
    })

    const parsedBets = []
    for(let i = 0; i < dbBets.length; i++) {
        const bet = dbBets[i].dataValues
        bet.odd = await Odd.findOne({ where: { id: bet.oddId }})
        bet.game = await Game.findOne({ where: { id: bet.gameId }})

        bet.odd = bet.odd.dataValues
        bet.game = bet.game.dataValues


        parsedBets.push(bet)
    }

    return res.status(200).json(parsedBets)
}

exports.placeBet = async (req, res) => {
    const {
        bets,
        payment
    } = req.body
    const { paymentType, paymentData } = payment
    const userData = req.jwt

    // Insert bets and payments
    bets.forEach(async bet => {
        const {
            gameId,
            oddId,
            value
        } = bet

        const newBet = await Bet.create({
            userId: userData.id,
            gameId: gameId,
            oddId: oddId,
            total: value
        })

        if(paymentType === 'MBWAY') {
            await MbWayPayment.create({
                phone: paymentData.phone,
                value: newBet.total,
                betId: newBet.id
            })
        } else if(paymentType === 'CARD') {
            await CardPayment.create({
                phone: paymentData.phone,
                value: newBet.total,
                betId: newBet.id
            })
        }
    })
    
    return res.status(200).json({
        status: true
    })
}