const { Bet, MbWayPayment, CardPayment } = require('../model/db/model.db')

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