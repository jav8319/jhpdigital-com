const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../../config/connection');

class M_order extends Model {} // Booked maintenance orders

M_order.init(
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
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Validates that the value is a valid email address
      },
    },

    ProvinceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'myprovinces', // name of the related table
        key: 'id',
      },
    },
    CityID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mycities', // name of the related table
        key: 'id',
      },
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Subscription:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    PayFrequencySub:{
      type: DataTypes.STRING,
      allowNull: true,
    },

    NextSubMaintdDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    TransactionValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    TermsAgreed: {
      type: DataTypes.TEXT,
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
    modelName: 'm_orders',
  }
);

module.exports = M_order;




