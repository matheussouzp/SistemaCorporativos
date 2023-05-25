const Sequelize = require('sequelize');
const database = require('../db.js');
const Movimento = require('./movimento.js');

const Deposito = database.define('deposito', {
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
  filial: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Deposito.hasMany(Movimento);


module.exports = Deposito;
