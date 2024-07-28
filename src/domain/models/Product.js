const { DataTypes } = require('sequelize');
const sequelize = require('../../infrastructure/database/database');

const categoryValues = ['Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa'];

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O nome é obrigatório'
      }
    }
  },
  category: {
    type: DataTypes.ENUM(...categoryValues),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'A categoria é obrigatória'
      }
    }
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O preço é obrigatório'
      }
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
});

module.exports = Product;