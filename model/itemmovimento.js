const Sequelize = require('sequelize');
const database = require('../db.js');

const ItemMovimento = database.define('itemmovimento', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});



module.exports = ItemMovimento;
