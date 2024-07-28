const express = require('express');
const router = express.Router();
const orderController = require('../../adapters/controllers/orderController');
const productController = require('../../adapters/controllers/productController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

router.get('/pedidos/novo', async (req, res) => {
  try {
    const products = await productController.findAll(req, res);
    res.render('orders/new', { products, user: req.session.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/pedidos/acompanhar', ensureAuthenticated, orderController.getPendingOrders);

router.post('/pedidos', ensureAuthenticated, orderController.create);

router.get('/pedidos/cozinha', ensureAuthenticated, orderController.getOrdersForKitchen);

router.post('/pedidos/atualizar', ensureAuthenticated, orderController.updateStatus);

module.exports = router;