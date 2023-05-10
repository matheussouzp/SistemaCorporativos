const jwt = require('jsonwebtoken');
require('dotenv');

async function autentica(user){
    //Avaliar se o usuário e a senha existem no banco de dados
    //A SENHA DEVE SER CRIPTOGRAFADA ANTES DE GRAVAR NO BANCO DE DADOS
    console.log('auth')

    if (user.name == 'admin' && user.password == 'admin') {
        console.log('existe')
        //Retorno de um identificador do usuário no banco de dados
        id =123; //Está linha será substituida posteriormente
        const token = jwt.sign(
            {id},
            process.env.SECRET,
            {expiresIn:300});
            user.id = id;
            user.auth = true;
            user.token = token; 
    }
    else{
        console.log(' n existe')
        user.id = '';
        user.auth = false;
        user.token = ''; 
    }
    return user;

    
}
async function verificaToken(req, res, next){
    const token = req.headers['x-acess-token'];
    if(!token) return res.status(401).json({auth:false, message:'token não informado'});
    jwt.verify(token,process.env.SECRET,(err)=>{
        if(err){
            return res.status(401).json({auth:false,message:'A autenticação falhou'});
        }
        next();
    });

}
module.exports={
    autentica,
    verificaToken
};