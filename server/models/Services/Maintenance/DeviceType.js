const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../../config/connection');

class Devicetype extends Model {} // Booked maintenance orders

Devicetype.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    DeviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'device_types',
  }
);

module.exports = Devicetype
