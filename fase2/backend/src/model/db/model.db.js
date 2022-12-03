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
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    NIC: DataTypes.STRING,
    NIF: DataTypes.STRING,
    birthday: DataTypes.DATE,
    wallet: DataTypes.FLOAT,
}, {
    sequelize: sequelizeConnection,
    modelName: 'user'
});

User.hasMany(Bet)
Bet.belongsTo(User)

Bet.belongsTo(Game)
Game.hasMany(Bet)

Odd.hasMany(Bet)
Bet.belongsTo(Odd)

Game.hasMany(Odd)
Odd.belongsTo(Game)

exports.User = User
exports.Game = Game
exports.Odd = Odd
exports.Bet = Bet