const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app = express();
require('dotenv').config()
const auth = require('./auth.js');

var usuarioRouter = require('./routes/usuarioRouter.js');

app.use(express.json());
app.use(bodyParser.json());
app.use('/usuario', usuarioRouter);


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
     
  //DEPOSITO
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
  );
  const clientes = await Cliente.findAll();
  console.log(clientes);
    
    await Movimento.create(
      {
          id:5,
          tipo:'Parafuso S4',
          data:'2023-12-12',
          documento_id:3
      }*/
  
  
})();

app.post('/login', (req, res) => {
  // Aqui você pode fazer a validação do usuário e senha
  // Em um exemplo simples, vamos apenas verificar se o usuário é "admin" e a senha é "password"
  const username = req.body.username;
  const password = req.body.password;
  
  if (username === 'admin' && password === 'password') {
    // Gere um token JWT
    const token = jwt.sign({ username: 'admin' }, 'chave_secreta');
    res.json({ token });
    
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

app.get('/',(req,res)=>{
  res.send('Aplicativo online');
  
});

app.get('/hora', (req, res) => {
  const data = moment().format('HH:mm:ss');
  console.log(data);
  res.send(data);
});

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, 'chave_secreta', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
};

app.get('/data', verifyToken, (req, res) => {
  // Aqui você pode retornar os dados protegidos
  res.json({ data: 'Dados protegidos' });
});

/*app.get('/data', (req, res) => {
  // Aqui você pode implementar um middleware para verificar se o token é válido
  // Se o token não for válido, retorne um código de status 401 (Unauthorized)
  // Se o token for válido, retorne os dados protegidos para o cliente
  res.json({
    data: 'Dados protegidos'
  });
});*/


/*app.post('/login', (req,res) =>{
  console.log(req.body);
  const user = req.body;
  auth.autentica(user);
  res.send(user);
});*/

//Rota autenticada
app.post('/user/save', auth.verificaToken,(req,res) =>{
  console.log('autenticou');
  res.send('ok');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
