const { Bet, MbWayPayment, CardPayment, Notification, Odd, Game, User } = require('../model/db/model.db')

class BetsController {
    getBets = async userId => {
        const dbBets = await Bet.findAll({
            where: {
                userId: userId
            },
            order: [    
                ['createdAt', 'DESC'],
            ],
        })

        const parsedBets = await Promise.all(await dbBets.map(async dbBet => {
            const bet = dbBet.dataValues
            bet.odd = await Odd.findOne({ where: { id: bet.oddId }})
            bet.game = await Game.findOne({ where: { id: bet.gameId }})

            bet.odd = bet.odd.dataValues
            bet.game = bet.game.dataValues

            return bet
        }))

        return parsedBets
    }

    getBetsHistory = async (req, res) => {
        const userData = req.jwt
        const betsHistory = await getBets(userData.id)

        return res.status(200).json(betsHistory)
    }
    
    cancelBet = async (req, res) => {
        const {
            betId
        } = req.body
        const userData = req.jwt
        
        const result = await Bet.destroy({
            where: {
                userId: userData.id,
                id: betId
            }
        })

        console.log(result)

        const betsHistory = await getBets(userData.id)
        
        return res.status(200).json({
            status: true,
            betsHistory
        })
    }
    
    placeBet = async (req, res) => {
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
                value,
            } = bet
    
            const newBet = await Bet.create({
                userId: userData.id,
                gameId: gameId,
                oddId: oddId,
                total: value,
                state: 'ABERTA'
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

    changeState = async (req,res) => {
        const { betId,state } = req.body
        const bet = await Bet.findByPk(betId)
        await bet.update({ state: state })
        await bet.save()
            
        return res.status(200).json({
            status: true,
        })   
    }

    updateOdd = async (req, res) => {
        const { odd } = req.body
        const userData = req.jwt
        const oddObj = await Odd.findByPk(odd.id)

        await oddObj.update({ value: parseFloat(odd.value) })
        await oddObj.save()

        const bettingUsers = (await Bet.findAll({
            where: {
                oddId: odd.id
            }
        })).map(bet => bet.dataValues.userId)

        const game = await Game.findByPk(oddObj.dataValues.gameId, { include: User })

        const followers = game.dataValues.users.map(user => user.id)

        console.log(bettingUsers)
        console.log(followers)
        
        const receivingUsers = new Set(bettingUsers.concat(followers))

        receivingUsers.forEach(async userId => {
            await Notification.create({
                userId: userId,
                msg: `A odd '${oddObj.dataValues.name}' do jogo ${game.dataValues.homeTeam} vs ${game.dataValues.awayTeam} foi alterada para ${odd.value}`,
                time:(new Date(Date.now())).toISOString()
            })
        })
            
        return res.status(200).json({
            status: true,
        })   
    }

    filterBet = async (req,res) => {
        const { state } = req.body
        const bets = {}

        const betsHistory = await getBets(userData.id)

        betsHistory.forEach(async bet =>{
            if (bet.dataValues.state === state){
                bets[bet.dataValues.id].push(bet.dataValues)
            }
        })
            
        return res.status(200).json({
            status: true,
            bets
        })
    }
}

exports.BetsController = BetsController