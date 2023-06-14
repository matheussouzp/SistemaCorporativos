const express = require('express');
const router = express.Router();
const itemMovimentoController = require('../controllers/itemmovimentoController');

router.get('/', itemMovimentoController.listar);
router.post('/', itemMovimentoController.salvar);
router.get('/:id', itemMovimentoController.buscarPorId);
router.put('/:id', itemMovimentoController.atualizar);
router.delete('/:id', itemMovimentoController.excluir);

module.exports = router;
