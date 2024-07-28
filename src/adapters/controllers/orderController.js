const Sequelize = require('sequelize');
const Order = require('../../domain/models/Order');

class OrderController {
  async new(req, res) {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
      res.redirect('/produtos');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { total_price, products } = req.body;
      const user_id = req.session.user.id; // Certifique-se de que o ID do usuário está presente na sessão

      // Cria o pedido no banco de dados
      const newOrder = await Order.create({
        user_id,
        total_price,
        products: JSON.parse(products), // Certifique-se de que o campo products seja JSON no modelo
        status: 'Recebido'
      });

      res.redirect('/pedidos/acompanhar'); // Redirecionar para uma página de sucesso ou similar
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getPendingOrders(req, res) {
    try {
      const user_id = req.session.user.id;
      const orders = await Order.findAll({
        where: {
          user_id,
          status: {
            [Sequelize.Op.ne]: 'Finalizado',
          },
        },
      });
      res.render('orders/show', { orders });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOrdersForKitchen (req, res) { 
    try {
      const orders = await Order.findAll({
        where: {
          status: {
            [Sequelize.Op.in]: ['Recebido', 'Em preparação', 'Pronto'],
          },
        },
      });
      res.render('orders/index', { orders });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateStatus (req, res) { 
    try {
      const { orderId, status } = req.body;
      await Order.update({ status }, {
        where: { id: orderId }
      });
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}


module.exports = new OrderController();