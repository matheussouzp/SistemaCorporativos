

const Sequelize = require('sequelize');
const database = require('../db.js');

const Deposito = database.define('deposito', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    filial: {
        type: Sequelize.STRING, 
        allowNull: false
    }
});

module.exports = Deposito;