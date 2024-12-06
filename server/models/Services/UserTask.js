const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class UserTask extends Model {} // Booked maintenance orders

UserTask.init(
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
taskID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tasks_codes', // name of the related table
        key: 'id',
      },
    },


   
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'user_tasks',
  }
);

module.exports = UserTask;




