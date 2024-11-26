const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductAttribute extends Model {}

ProductAttribute.init(
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
    AttributeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'attributes', // name of the related table
        key: 'id',
      },
    },
    Value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'product_attributes',
  }
);

module.exports = ProductAttribute;


