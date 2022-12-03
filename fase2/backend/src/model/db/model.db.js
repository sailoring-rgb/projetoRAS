const { Model, DataTypes } = require('sequelize')
const { sequelizeConnection } = require('../../db/db.init');

class Games extends Model {}
Games.init({
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
    modelName: 'Games'
});

class Bets extends Model {}
Bets.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    total: DataTypes.FLOAT,
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: 'Bets'
});

class Odds extends Model {}
Odds.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: DataTypes.STRING,
    value: DataTypes.FLOAT,
}, {
    sequelize: sequelizeConnection,
    modelName: 'Odds'
});

class Users extends Model {}
Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    NIC: DataTypes.STRING,
    NIF: DataTypes.STRING,
    birthday: DataTypes.DATE,
}, {
    sequelize: sequelizeConnection,
    modelName: 'Users'
});

Users.hasMany(Bets)
Bets.belongsTo(Users)

Bets.belongsTo(Games)
Games.hasMany(Bets)

Odds.hasMany(Bets)
Bets.belongsTo(Odds)

Games.hasMany(Odds)
Odds.belongsTo(Games)

exports.Users = Users
exports.Games = Games
exports.Odds = Odds
exports.Bets = Bets