const { Model, DataTypes } = require('sequelize')
const { sequelizeConnection } = require('../../db/db.init');

class Game extends Model {}
Game.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    homeTeam: DataTypes.STRING,
    awayTeam: DataTypes.STRING,
    commenceTime: DataTypes.DATE,
    oddsKey: DataTypes.STRING,
    gameType: DataTypes.STRING
}, {
    sequelize: sequelizeConnection,
    modelName: 'game'
});

class Bet extends Model {}
Bet.init({
    // id: {
    //     type: DataTypes.STRING,
    //     primaryKey: true
    // },
    total: DataTypes.FLOAT,
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: 'bet'
});

class Odd extends Model {}
Odd.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: DataTypes.STRING,
    value: DataTypes.FLOAT,
}, {
    sequelize: sequelizeConnection,
    modelName: 'odd'
});

class User extends Model {}
User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    email: { 
        type: DataTypes.STRING,
        unique: true
    },
    NIC: DataTypes.STRING,
    NIF: DataTypes.STRING,
    birthday: DataTypes.DATE,
    wallet: DataTypes.FLOAT,
    type: DataTypes.STRING
}, {
    sequelize: sequelizeConnection,
    modelName: 'user'
});

class Transaction extends Model {}
Transaction.init({
    type: DataTypes.STRING,
    value: DataTypes.FLOAT
}, {
    sequelize: sequelizeConnection,
    modelName: 'transactions'
});

class MbWayPayment extends Model {}
MbWayPayment.init({
    phone: DataTypes.STRING,
    value: DataTypes.FLOAT
},{
    sequelize: sequelizeConnection,
    modelName: 'mbwaypayment'
})

class CardPayment extends Model {}
CardPayment.init({
    phone: DataTypes.STRING,
    value: DataTypes.FLOAT
},{
    sequelize: sequelizeConnection,
    modelName: 'cardpayment'
})

User.hasMany(Bet, { foreignKey: 'userId', onDelete: 'CASCADE' })
Bet.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' })

Bet.belongsTo(Game, { foreignKey: 'gameId', onDelete: 'CASCADE' })
Game.hasMany(Bet, { foreignKey: 'gameId', onDelete: 'CASCADE' })

Odd.hasMany(Bet, { foreignKey: 'oddId', onDelete: 'CASCADE' })
Bet.belongsTo(Odd, { foreignKey: 'oddId', onDelete: 'CASCADE' })

Game.hasMany(Odd, { foreignKey: 'gameId', onDelete: 'CASCADE' })
Odd.belongsTo(Game, { foreignKey: 'gameId', onDelete: 'CASCADE' })

User.hasMany(Transaction, { foreignKey: 'userId', onDelete: 'CASCADE' })
Transaction.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' })

// MbWayPayment.hasOne(Bet)
Bet.hasOne(MbWayPayment)

// CardPayment.hasOne(Bet)
Bet.hasOne(CardPayment)

exports.User = User
exports.Transaction = Transaction
exports.Game = Game
exports.Odd = Odd
exports.Bet = Bet
exports.CardPayment = CardPayment
exports.MbWayPayment = MbWayPayment