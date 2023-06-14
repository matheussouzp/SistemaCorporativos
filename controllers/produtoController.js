const produtoModel = require('../models/produto');

class ProdutoController {
    async salvar(req, res) {
        const { nome, cor } = req.body;
    
        try {
          // Verificar se já existe um produto com o mesmo nome
          const produtoExistente = await produtoModel.findOne({ where: { nome, cor } });
    
          if (produtoExistente) {
            return res.status(400).json({ error: 'Produto Existente' });
          }
    
          // Criar um novo produto
          const produto = await produtoModel.create({
            nome,
            cor
          });
    
          res.status(201).json(produto);
        } catch (error) {
          console.error('Erro ao criar produto:', error);
          res.status(500).json({ error: 'Erro ao criar produto' });
        }
    }

  async listar(req, res) {
    try {
      const produtos = await produtoModel.findAll();
      res.json(produtos);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
  }

  async buscarPorId(req, res) {
    const { id } = req.params;

    try {
      const produto = await produtoModel.findByPk(id);

      if (produto) {
        res.json(produto);
      } else {
        res.status(404).json({ error: 'Produto não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      res.status(500).json({ error: 'Erro ao buscar produto' });
    }
  }

  async buscarPorNome(req, res) {
    const { nome } = req.params;
  
    try {
      const produtos = await produtoModel.findAll({
        where: {
          nome
        }
      });
  
      if (produtos.length === 0) {
        return res.status(404).json({ error: 'Nenhum produto encontrado com o nome fornecido' });
      }
  
      res.json(produtos);
    } catch (error) {
      console.error('Erro ao buscar produtos por nome:', error);
      res.status(500).json({ error: 'Erro ao buscar produtos por nome' });
    }
  }
  

  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, cor } = req.body;

    try {
      const produto = await produtoModel.findByPk(id);

      if (produto) {
        produto.nome = nome;
        produto.cor = cor;
        await produto.save();
        res.json(produto);
      } else {
        res.status(404).json({ error: 'Produto não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  }

  async excluir(req, res) {
    const { id } = req.params;

    try {
      const produto = await produtoModel.findByPk(id);

      if (produto) {
        await produto.destroy();
        res.json({ message: 'Produto excluído com sucesso' });
      } else {
        res.status(404).json({ error: 'Produto não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      res.status(500).json({ error: 'Erro ao excluir produto' });
    }
  }
}

module.exports = new ProdutoController();
