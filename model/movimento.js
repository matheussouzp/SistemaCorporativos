    const Sequelize = require('sequelize');
    const database = require('../db.js');
    const Produto = require('./produto.js');
    const Cliente = require('./cliente.js');
    const Deposito = require('./deposito.js');
    const Documento = require('./documento.js');


    const Movimento = database.define('movimento', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
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

    
   /* Movimento.hasOne(Cliente);
    Movimento.hasOne(Deposito);
    Movimento.hasOne(Documento);
    
    Movimento.hasMany(Produto, {
        foreignKey: {
          allowNull: false,
          name: 'movimentoId'
        }
      });

      */
    module.exports = Movimento;