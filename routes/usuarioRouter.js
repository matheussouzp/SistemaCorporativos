const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.listar);
router.get('/validar', usuarioController.validarToken);
router.post('/', usuarioController.salvar);
router.post('/login', usuarioController.autenticar);
router.get('/:id', usuarioController.buscarPorId);
router.put('/:id', usuarioController.atualizar);
router.delete('/:id', usuarioController.excluir);

module.exports = router;