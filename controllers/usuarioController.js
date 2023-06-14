const usuarioModel = require('../models/usuario.js');
const jwt = require('jsonwebtoken');
const chaveSecreta = 'sua_chave_secreta_aqui';


class UsuarioController {   
    
    async salvar(req, res) {
        const { nome, password } = req.body;
        console.log(nome);
        console.log(password);
        
        try {
            // Verificar se já existe um usuário com o mesmo nome
            const usuarioExistente = await usuarioModel.findOne({ where: { nome } });
            
            if (usuarioExistente) {
                return res.status(400).json({ error: 'O nome de usuário já está em uso' });
            }
    
            // Criar um novo usuário
            const usuario = await usuarioModel.create({
                nome,
                password
            });
    
            res.status(201).json(usuario);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    }
    
    async autenticar(req, res) {    
        const { nome, password } = req.body;
        
        try {
            const usuario = await usuarioModel.findOne({ where: { nome } });
            
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            
            if (usuario.password !== password) {
                return res.status(401).json({ error: 'Senha incorreta' });
            }
            
            // Gerar o token JWT
            const token = jwt.sign({ nome: usuario.nome }, chaveSecreta, { expiresIn: '1h' });

            res.status(200).json({ token });
        } catch (error) {
            console.error('Erro ao autenticar usuário:', error);
            res.status(500).json({ error: 'Erro ao autenticar usuário' });
        }
    }

    validarToken(req, res) {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        jwt.verify(token, chaveSecreta, (error, decoded) => {
            if (error) {
                console.error('Erro ao verificar token:', error);
                return res.status(403).json({ error: 'Token inválido' });
            }

            // Token válido
            console.log('Token válido');
            res.status(200).json({ message: 'Token válido' });
        });
    }

    async listar(req, res) {

        try {
            const usuarios = await usuarioModel.findAll();
            res.json(usuarios);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
        
    }

    async buscarPorId(req, res) {
        const id = req.params.id;
        try {
        const usuario = await usuarioModel.findByPk(id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
        } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    }

    async atualizar(req, res) {
        const id = req.params.id;
        const { nome, password } = req.body;
        try {
        const usuario = await usuarioModel.findByPk(id);
        if (usuario) {
            usuario.nome = nome;
            usuario.password = password;
            await usuario.save();
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
        } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
    }

    async excluir(req, res) {
        const id = req.params.id;
        try {
        const usuario = await usuarioModel.findByPk(id);
        if (usuario) {
            await usuario.destroy();
            res.json({ message: 'Usuário excluído com sucesso' });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
        } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).json({ error: 'Erro ao excluir usuário' });
        }
    }
}



module.exports = new UsuarioController();