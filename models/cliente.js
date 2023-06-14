

const Sequelize = require('sequelize');
const database = require('../db.js');
const Movimento = require('./movimento.js');
const Titulo = require('./titulo.js');


const Cliente = database.define('cliente', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true      
    },
    cpf: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    email: {
        type: Sequelize.STRING, 
        allowNull: false
    }
});
Cliente.hasMany(Movimento);
Cliente.hasMany(Titulo);


module.exports = Cliente;