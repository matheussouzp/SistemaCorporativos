const express = require('express');
const router = express.Router();
const movimentoController = require('../controllers/movimentoController');
const itemMovimentoController = require('../controllers/itemmovimentoController');


router.get('/', movimentoController.listar);
router.post('/', movimentoController.salvar);
router.get('/:id', movimentoController.buscarPorId);
router.put('/:id', movimentoController.atualizar);
router.delete('/:id', movimentoController.excluir);
router.get('/produtos/:movimentoId', itemMovimentoController.listarPorMovimentoId); // Rota para listar itemmovimentos por movimentoId

module.exports = router;
