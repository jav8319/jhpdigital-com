const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class Availability extends Model {}

Availability.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // name of the related table
        key: 'id',
      },
    },

    WeekDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    InitialHour: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    FinalHour: {
      type: DataTypes.TIME,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'availabilities',
  }
);

module.exports = Availability;


