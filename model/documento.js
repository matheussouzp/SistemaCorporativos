const Sequelize = require('sequelize');
const database = require('../db.js');

const Documento = database.define('documento', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    tipo: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    data: {
        type: Sequelize.DATE, 
        allowNull: false
    }
});

module.exports = Documento;