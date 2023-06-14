const Sequelize = require('sequelize');
const database = require('../db.js');
const ItemMovimento = require('./itemmovimento.js');

const Produto = database.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    cor: {
        type: Sequelize.STRING, 
        allowNull: false
    }
});

Produto.hasMany(ItemMovimento);

module.exports = Produto;