const Product = require('../../domain/models/Product');

class ProductController {
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res.redirect('/produtos'); // Redireciona após a criação do produto
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const products = await Product.findAll();
      return products; // Retorna os produtos em vez de enviar a resposta
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async show(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (product) {
        res.render('products/show', { product });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async editForm(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (product) {
        res.render('products/edit', { product });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (product) {
        console.log('Request body:', req.body); // Log para verificar os dados recebidos
        const [updated] = await Product.update(req.body, {
          where: { id: req.params.id }
        });
        if (updated) {
          console.log('Product updated:', req.body); // Log para verificar os dados atualizados
          res.redirect('/produtos'); // Redireciona após atualização
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.log('Error:', error.message); // Log do erro
      res.status(500).json({ error: error.message });
    }
  }
  
  

  async delete(req, res) {
    try {
      const deleted = await Product.destroy({
        where: {
          id: req.params.id
        }
      });

      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProductController();
