const ItemMovimentoModel = require('../models/itemmovimento');
const MovimentoModel = require('../models/movimento');
const ProdutoModel = require('../models/produto');

class ItemMovimentoController {
  async salvar(req, res) {
    const { quantidade, valorunitario, movimentoId, produtoId } = req.body;

    try {
      // Verificar se o movimento e o produto existem
      const movimento = await MovimentoModel.findByPk(movimentoId);
      const produto = await ProdutoModel.findByPk(produtoId);
      
      if (!movimento || !produto) {
        return res.status(404).json({ error: 'Movimento ou Produto não encontrado' });
      }

      const itemMovimento = await ItemMovimentoModel.create({
        quantidade,
        valorunitario,
        movimentoId,
        produtoId
      });

      const movimentonovo = await MovimentoModel.findByPk(movimentoId);
      movimentonovo.valor += quantidade * valorunitario;
      await movimentonovo.save();

      res.status(201).json(itemMovimento);
    } catch (error) {
      console.error('Erro ao criar item de movimento:', error);
      res.status(500).json({ error: 'Erro ao criar item de movimento' });
    }
  }

  async listar(req, res) {
    try {
      const itemMovimentos = await ItemMovimentoModel.findAll();
      res.json(itemMovimentos);
    } catch (error) {
      console.error('Erro ao buscar itens de movimento:', error);
      res.status(500).json({ error: 'Erro ao buscar itens de movimento' });
    }
  }

  async buscarPorId(req, res) {
    const { id } = req.params;

    try {
      const itemMovimento = await ItemMovimentoModel.findByPk(id);

      if (itemMovimento) {
        res.json(itemMovimento);
      } else {
        res.status(404).json({ error: 'Item de movimento não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar item de movimento:', error);
      res.status(500).json({ error: 'Erro ao buscar item de movimento' });
    }
  }

  async listarPorMovimentoId(req, res) {
    const { movimentoId } = req.params;

    try {
      console.log('Erro 1');

      const itemMovimentos = await ItemMovimentoModel.findAll();
      

      if (itemMovimentos.length === 0) {
        return res.status(404).json({ error: 'Nenhum item de movimento encontrado para o movimento fornecido' });
      }

      const listaItemMovimentos = itemMovimentos.map((item) => ({
        nome: item.produto.nome,
        quantidade: item.quantidade
      }));

      res.json(listaItemMovimentos);
    } catch (error) {
      console.error('Erro ao buscar item de movimento por movimentoId:', error);
      res.status(500).json({ error: 'Erro ao buscar item de movimento por movimentoId' });
    }
  }
  
  async atualizar(req, res) {
    const { id } = req.params;
    const { quantidade, valorunitario, movimentoId } = req.body;

    try {
      const itemMovimento = await ItemMovimentoModel.findByPk(id);

      if (!itemMovimento) {
        return res.status(404).json({ error: 'Item de movimento não encontrado' });
      }

      // Diminuir o valor antigo do movimento
      const movimentoAntigo = await MovimentoModel.findByPk(itemMovimento.movimentoId);
      movimentoAntigo.valor -= itemMovimento.quantidade * itemMovimento.valorunitario;
      await movimentoAntigo.save();

      // Atualizar o item de movimento
      itemMovimento.quantidade = quantidade;
      itemMovimento.valorunitario = valorunitario;
      itemMovimento.movimentoId = movimentoId;
      await itemMovimento.save();

      // Atualizar o valor do movimento existente
      const movimentoNovo = await MovimentoModel.findByPk(movimentoId);
      movimentoNovo.valor += quantidade * valorunitario;
      await movimentoNovo.save();

      res.json(itemMovimento);
    } catch (error) {
      console.error('Erro ao atualizar item de movimento:', error);
      res.status(500).json({ error: 'Erro ao atualizar item de movimento' });
    }
  }

  async excluir(req, res) {
    const { id } = req.params;

    try {
      const itemMovimento = await ItemMovimentoModel.findByPk(id);

      if (!itemMovimento) {
        return res.status(404).json({ error: 'Item de movimento não encontrado' });
      }

      const { quantidade, valorunitario, movimentoId } = itemMovimento;

      // Subtrair o valor do itemMovimento do movimento existente
      const movimento = await MovimentoModel.findByPk(movimentoId);
      movimento.valor -= quantidade * valorunitario;
      await movimento.save();

      // Excluir o item de movimento
      await itemMovimento.destroy();

      res.json({ message: 'Item de movimento excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir item de movimento:', error);
      res.status(500).json({ error: 'Erro ao excluir item de movimento' });
    }
  }

}

module.exports = new ItemMovimentoController();
