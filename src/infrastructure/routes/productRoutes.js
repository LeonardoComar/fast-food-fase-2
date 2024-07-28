const express = require('express');
const router = express.Router();
const productController = require('../../adapters/controllers/productController');

router.get('/produtos', async (req, res) => {
  try {
    const products = await productController.findAll(req, res);
    res.render('products/index', { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/produtos/novo', (req, res) => res.render('products/new'));

router.get('/produtos/:id', async (req, res) => {
  try {
    await productController.show(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/produtos/:id/editar', async (req, res) => {
  try {
    await productController.editForm(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/produtos', productController.create);

router.put('/produtos/:id', productController.update);

router.delete('/produtos/:id', productController.delete);

module.exports = router;
