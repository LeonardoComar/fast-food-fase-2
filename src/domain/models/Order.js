const { DataTypes } = require('sequelize');
const sequelize = require('../../infrastructure/database/database');

const statusValues = ['Recebido', 'Em preparação', 'Pronto', 'Finalizado'];

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Nome da tabela de usuários
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  products: {
    type: DataTypes.JSON,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM(...statusValues),
    allowNull: false,
    defaultValue: 'Recebido'
  },
}, {
  timestamps: true,
});

module.exports = Order;

const User = require('./User'); // Importe o User depois de exportar Order

Order.belongsTo(User, { foreignKey: 'user_id' }); // Agora defina a associação
