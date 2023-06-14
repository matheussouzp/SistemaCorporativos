const Sequelize = require('sequelize');
const database = require('../db.js');
const Movimento = require('./movimento.js');


const Titulo = database.define('titulo', {
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
    valororiginal: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    situacao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valoraberto: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});



Titulo.hasMany(Movimento);


module.exports = Titulo;