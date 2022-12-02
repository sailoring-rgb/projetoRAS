const { Sequelize, Model, DataTypes } = require('sequelize')
const { sequelizeConnection } = require('../../db/db.init');

// const sequelize = new Sequelize('mysql://root:3eef157bb049RURU-@localhost:3306/rasbet');

const Users = sequelizeConnection.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    NIC: DataTypes.STRING,
    NIF: DataTypes.STRING,
    birthday: DataTypes.DATE,
});

exports.Users = Users