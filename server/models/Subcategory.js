const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Subcategory extends Model {}

Subcategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    SubcategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories', // name of the related table
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'subcategories',
  }
);

module.exports = Subcategory;
