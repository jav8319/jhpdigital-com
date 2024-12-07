const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class ProductAttribute extends Model {}

ProductAttribute.init(
  {
    codeID: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: 'product_codes', // name of the related table
        key: 'id',
      },
    },
    AttributeID: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: 'list_attributes', // name of the related table
        key: 'id',
      },
    },
    AttributeValue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'joinList_attributes',
  }
);

module.exports = ProductAttribute;


