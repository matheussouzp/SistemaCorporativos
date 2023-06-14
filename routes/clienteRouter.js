const express = require('express');
const clienteController = require('../controllers/clienteController');
const router = express.Router();

router.post('/', clienteController.salvar);
router.get('/', clienteController.listar);
router.get('/:id', clienteController.buscarPorId);
router.get('/cpf/:cpf', clienteController.buscarPorCpf);
router.put('/:id', clienteController.atualizar);
router.delete('/:id', clienteController.excluir);

module.exports = router;
