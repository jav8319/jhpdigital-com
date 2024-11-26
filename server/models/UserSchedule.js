const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserSchedule extends Model {}

UserSchedule.init(
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
    ScheduleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'schedules', // name of the related table
        key: 'id',
      },
    },
    Booked: {
      type: DataTypes.BOOLEAN, 
      allowNull: false,
    },
    Activity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'user_schedules',
  }
);

module.exports = UserSchedule;



