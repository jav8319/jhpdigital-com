const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class ProductSpec extends Model {}

ProductSpec.init(
  {
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products', // name of the related table
        key: 'id',
      },
    },
    SpecID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'specs', // name of the related table
        key: 'id',
      },
    },
    SpecValue: {
      type: DataTypes.STRING,//value of the spec
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'product_specs',
  }
);

module.exports = ProductSpec;


