const Sequelize = require('sequelize');
const database = require('../db.js');

const Usuario = database.define('usuario', {
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
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


module.exports = Usuario;
