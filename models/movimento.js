const Sequelize = require('sequelize');
const database = require('../db.js');

const ItemMovimento = require('./itemmovimento.js');


const Movimento = database.define('movimento', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    },
    valor: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});



Movimento.hasMany(ItemMovimento);


module.exports = Movimento;
