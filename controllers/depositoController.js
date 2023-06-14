const DepositoModel = require('../models/deposito');

class DepositoController {
  async salvar(req, res) {
    const { nome, filial } = req.body;

    try {
      // Verificar se já existe um depósito com o mesmo nome
      const depositoExistente = await DepositoModel.findOne({ where: { nome } });
      if (depositoExistente) {
        return res.status(400).json({ error: 'Depósito já existe' });
      }
      // Criar um novo depósito
      const deposito = await DepositoModel.create({ nome, filial });
      res.status(201).json(deposito);
    } catch (error) {
      console.error('Erro ao criar depósito:', error);
      res.status(500).json({ error: 'Erro ao criar depósito' });
    }
  }

  async listar(req, res) {
    try {
      const depositos = await DepositoModel.findAll();
      res.json(depositos);
    } catch (error) {
      console.error('Erro ao buscar depósitos:', error);
      res.status(500).json({ error: 'Erro ao buscar depósitos' });
    }
  }

  async buscarPorId(req, res) {
    const { id } = req.params;

    try {
      const deposito = await DepositoModel.findByPk(id);

      if (deposito) {
        res.json(deposito);
      } else {
        res.status(404).json({ error: 'Depósito não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar depósito:', error);
      res.status(500).json({ error: 'Erro ao buscar depósito' });
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, filial } = req.body;

    try {
      const deposito = await DepositoModel.findByPk(id);

      if (deposito) {
        deposito.nome = nome;
        deposito.filial = filial;
        await deposito.save();
        res.json(deposito);
      } else {
        res.status(404).json({ error: 'Depósito não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao atualizar depósito:', error);
      res.status(500).json({ error: 'Erro ao atualizar depósito' });
    }
  }

  async excluir(req, res) {
    const { id } = req.params;

    try {
      const deposito = await DepositoModel.findByPk(id);

      if (deposito) {
        await deposito.destroy();
        res.json({ message: 'Depósito excluído com sucesso' });
      } else {
        res.status(404).json({ error: 'Depósito não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao excluir depósito:', error);
      res.status(500).json({ error: 'Erro ao excluir depósito' });
    }
  }
}

module.exports = new DepositoController();
