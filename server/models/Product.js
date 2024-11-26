const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ProductGroupID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductCodeNum: {
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
    SubcategoryID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'subcategories', // name of the related table
        key: 'id',
      },
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    Stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PackageWidth: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    PackageHeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    PackageLength: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    PackageWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ProductWidth: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ProductHeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ProductLength: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ProductWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    PreviousProduct: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Obsolete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'products',
  }
);

module.exports = Product;


