const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class ListAttribute extends Model {}

ListAttribute.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    AttributeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'list_attributes',
  }
);

module.exports = ListAttribute;

