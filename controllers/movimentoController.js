const MovimentoModel = require('../models/movimento');
const ItemMovimentoModel = require('../models/itemmovimento');
const ProdutoModel = require('../models/produto');
const itemMovimentoController = require('../controllers/itemmovimentoController');



class MovimentoController {
  async salvar(req, res) {
    const { tipo, data, valor, tituloId, clienteId, depositoId, documentoId } = req.body;

    try {
      const movimento = await MovimentoModel.create({ tipo, data, valor, tituloId, clienteId, depositoId, documentoId });

      res.status(201).json(movimento);
    } catch (error) {
      console.error('Erro ao criar movimento:', error);
      res.status(500).json({ error: 'Erro ao criar movimento' });
    }
  }

  async listar(req, res) {
    try {
      const movimentos = await MovimentoModel.findAll();
      res.json(movimentos);
    } catch (error) {
      console.error('Erro ao buscar movimentos:', error);
      res.status(500).json({ error: 'Erro ao buscar movimentos' });
    }
  }

  async buscarPorId(req, res) {
    const { id } = req.params;

    try {
      const movimento = await MovimentoModel.findByPk(id);

      if (movimento) {
        res.json(movimento);
      } else {
        res.status(404).json({ error: 'Movimento não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar movimento:', error);
      res.status(500).json({ error: 'Erro ao buscar movimento' });
    }
  }

  async listarProdutosPorMovimento(req, res) {
    const { id } = req.params;
  
    try {
      const itemMovimentos = itemMovimentoController.listar({
       
      });
      
  
      if (itemMovimentos.length === 0) {
        return res.status(404).json({ error: 'Nenhum produto encontrado para o movimento fornecido' });
      }
  
      const produtos = itemMovimentos.map((item) => ({
        nome: item.produto.nome,
        quantidade: item.quantidade
      }));
  
      res.json(produtos);
    } catch (error) {
      console.error('Erro ao buscar produtos por movimento:', error);
      res.status(500).json({ error: 'Erro ao buscar produtos por movimento' });
    }
  }
  
  

  async atualizar(req, res) {
    const { id } = req.params;
    const { tipo, data, valor, tituloId, clienteId, depositoId, documentoId } = req.body;

    try {
      const movimento = await MovimentoModel.findByPk(id);

      if (movimento) {
        movimento.tipo = tipo;
        movimento.data = data;
        movimento.valor = valor;
        movimento.tituloId = tituloId;
        movimento.clienteId = clienteId;
        movimento.depositoId = depositoId;
        movimento.documentoId = documentoId;
        
        await movimento.save();
        res.json(movimento);
      } else {
        res.status(404).json({ error: 'Movimento não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao atualizar movimento:', error);
      res.status(500).json({ error: 'Erro ao atualizar movimento' });
    }
  }

  async excluir(req, res) {
    const { id } = req.params;

    try {
      const movimento = await MovimentoModel.findByPk(id);

      if (movimento) {
        await movimento.destroy();
        res.json({ message: 'Movimento excluído com sucesso' });
      } else {
        res.status(404).json({ error: 'Movimento não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao excluir movimento:', error);
      res.status(500).json({ error: 'Erro ao excluir movimento' });
    }
  }
}

module.exports = new MovimentoController();
