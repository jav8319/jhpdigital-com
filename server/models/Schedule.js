const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Schedule extends Model {}

Schedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ScheduleDate: {
      type: DataTypes.BIGINT, // milliseconds representation of the date
      allowNull: false,
    },

    InitialHour: {
      type: DataTypes.BIGINT, // milliseconds representation of the initial hour
      allowNull: false,
    },
    FinalHour: {
      type: DataTypes.BIGINT, // milliseconds representation of the final hour
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'schedules',
  }
);

module.exports = Schedule;



