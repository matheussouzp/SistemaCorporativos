const express = require('express');
const router = express.Router();
const depositoController = require('../controllers/depositoController');

router.get('/', depositoController.listar);
router.post('/', depositoController.salvar);
router.get('/:id', depositoController.buscarPorId);
router.put('/:id', depositoController.atualizar);
router.delete('/:id', depositoController.excluir);

module.exports = router;
