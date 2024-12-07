const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class TaskCode extends Model {} // Booked maintenance orders

TaskCode.init(
  {    
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

TaskCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'tasks_codes',
  }
);

module.exports = TaskCode;




