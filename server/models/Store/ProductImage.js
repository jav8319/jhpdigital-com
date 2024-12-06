const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class ProductImage extends Model {}

ProductImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    codeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product_codes', // name of the related table
        key: 'id',
      },
    },
    ImageUrl: {
      type: DataTypes.STRING, // Google Cloud Storage public URL
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'product_images',
  }
);

module.exports = ProductImage;




