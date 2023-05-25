const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config()
const moment = require('moment');
const auth = require('./auth.js');

app.use(express.json());
app.use(bodyParser.json());

const secret = 'mysecretkey';
(async () =>{
  const Movimento = require('./model/movimento.js');
  const ItemMovimento = require('./model/itemmovimento.js');
  const Titulo = require('./model/titulo.js');
  const database = require('./db.js');
  const Cliente = require('./model/cliente.js');
  const Deposito = require('./model/deposito.js');
  const Produto = require('./model/produto.js');
  const Documento = require('./model/documento.js');

  await database.sync({alter:true});

  //CLIENTE
  /*await Cliente.create(
    {
        id:2,
        cpf:'2323',
        nome:'Pedro Souza',
        email:'Pedro@hotmail.com'
    }
    
  );
  const clientes = await Cliente.findAll();
  console.log(clientes);*/

  //DOCUMENTO
  /*await Documento.create(
    {
        id:2,
        tipo:'Entrada',
        data: new Date().toISOString()
    }
    
  );
  const documentos = await Documento.findAll();
  console.log(documentos);
     

  await Deposito.create(
    {
        id:2,
        nome:'PARANÁ 01',
        filial:'PR'
    }
    await Produto.create(
    {
        id:5,
        nome:'Parafuso S6',
        cor:'prata',
        valorunitario: 3.5
    }
  );
  
  await Cliente.create(
    {
      cpf:'123456789',
      nome:'Beto Arte e cor',
      email:'Beto@hotmail.com'
    }
  );*/
  const clientes = await Cliente.findAll();
  console.log(clientes);
    
    /*await Movimento.create(
      {
          id:5,
          tipo:'Parafuso S4',
          data:'2023-12-12',
          documento_id:3
      }*/
  
  
})();





app.post('/api/login', (req, res) => {
  // Aqui você pode fazer a autenticação do usuário e validar as credenciais
  const username = req.body.username;
  const password = req.body.password;

  // Se o usuário estiver autenticado, crie um token JWT com o nome de usuário como payload
  const token = jwt.sign({ username }, secret);

  // Retorne o token para o cliente
  res.json({
    token
  });
});

app.get('/',(req,res)=>{
  res.send('Aplicativo online');
  
});
/*
app.get('/hora', (req,res)=>{
  const t = Date.now();
  const data = moment().format('HH:mm:ss');
  console.log(data);
  res.send(data);
});

app.get('/api/data', (req, res) => {
  // Aqui você pode implementar um middleware para verificar se o token é válido
  // Se o token não for válido, retorne um código de status 401 (Unauthorized)
  // Se o token for válido, retorne os dados protegidos para o cliente
  res.json({
    data: 'Dados protegidos'
  });
});*/

app.post('/login', (req,res) =>{
  console.log(req.body);
  const user = req.body;
  auth.autentica(user);
  res.send(user);
});

//Rota autenticada
app.post('/user/save', auth.verificaToken,(req,res) =>{
  console.log('autenticou');
  res.send('ok');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
