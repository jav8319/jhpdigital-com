const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class P_Order extends Model {} // Booked maintenance orders

P_Order.init(
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

    TransactionValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
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
    modelName: 'p_orders',
  }
);

module.exports = P_Order;




