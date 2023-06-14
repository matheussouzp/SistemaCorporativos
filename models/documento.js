const Sequelize = require('sequelize');
const database = require('../db.js');
const Movimento = require('./movimento.js');

const Documento = database.define('documento', {
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
    }
});
Documento.hasMany(Movimento);

module.exports = Documento;
