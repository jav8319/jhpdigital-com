const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductOrder extends Model {}

ProductOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products', // name of the related table
        key: 'id',
      },
    },
    P_OrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'p_orders', // name of the related table
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'product_Orders',
  }
);

module.exports = ProductOrder;


