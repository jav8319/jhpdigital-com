const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class T_Order extends Model {} // Booked maintenance orders

T_order.init(
  {    
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
    Name: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    Phone: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    Address: {
      type: DataTypes.STRING, 
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true, // Validates that the value is a valid email address
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
    TeachingJobID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teaching_jobs', // name of the related table 
        key: 'id',
      },
    },
    TransactionValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    JobDuration: {
      type: DataTypes.INTEGER,//seconds
      allowNull: false,
    },

    ZoomID: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    TransactionRefNum1: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    TransactionRefNum2: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 't_orders',
  }
);

module.exports = T_Order;




