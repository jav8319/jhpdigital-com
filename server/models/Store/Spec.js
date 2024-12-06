const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class Spec extends Model {}

Spec.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
   SpecName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'specs',
  }
);

module.exports = Spec;

