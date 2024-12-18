const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class mycity extends Model {} // Booked maintenance orders

mycity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    CityName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProvinceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'myprovinces', // name of the related table
        key: 'id',
      },
    },
    TransportationTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'mycities',
  }
);

module.exports = mycity
