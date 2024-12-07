const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class ProductOrder extends Model {}

ProductOrder.init(
  {
    codeID: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: 'product_codes', // name of the related table
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
    },

    ProductQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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


