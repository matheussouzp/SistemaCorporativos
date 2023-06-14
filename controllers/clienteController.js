const ClienteModel = require('../models/cliente');

class ClienteController {
  async salvar(req, res) {
    const { cpf, nome, email } = req.body;

    try {
      // Verificar se já existe um cliente com o mesmo CPF
      const clienteExistente = await ClienteModel.findOne({ where: { cpf } });

      if (clienteExistente) {
        return res.status(400).json({ error: 'Cliente já existe' });
      }

      // Criar um novo cliente
      const cliente = await ClienteModel.create({ cpf, nome, email });

      res.status(201).json(cliente);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      res.status(500).json({ error: 'Erro ao criar cliente' });
    }
  }

  async listar(req, res) {
    try {
      const clientes = await ClienteModel.findAll();
      res.json(clientes);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
  }

  async buscarPorId(req, res) {
    const { id } = req.params;

    try {
      const cliente = await ClienteModel.findByPk(id);

      if (cliente) {
        res.json(cliente);
      } else {
        res.status(404).json({ error: 'Cliente não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
  }

  async buscarPorCpf(req, res) {
    const { cpf } = req.params;

    try {
      const cliente = await ClienteModel.findOne({ where: { cpf } });

      if (cliente) {
        res.json(cliente);
      } else {
        res.status(404).json({ error: 'Cliente não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar cliente por CPF:', error);
      res.status(500).json({ error: 'Erro ao buscar cliente por CPF' });
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const { cpf, nome, email } = req.body;

    try {
      const cliente = await ClienteModel.findByPk(id);

      if (cliente) {
        cliente.cpf = cpf;
        cliente.nome = nome;
        cliente.email = email;
        await cliente.save();
        res.json(cliente);
      } else {
        res.status(404).json({ error: 'Cliente não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  }

  async excluir(req, res) {
    const { id } = req.params;

    try {
      const cliente = await ClienteModel.findByPk(id);

      if (cliente) {
        await cliente.destroy();
        res.json({ message: 'Cliente excluído com sucesso' });
      } else {
        res.status(404).json({ error: 'Cliente não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      res.status(500).json({ error: 'Erro ao excluir cliente' });
    }
  }
}

module.exports = new ClienteController();
