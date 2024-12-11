const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../../config/connection');

class TeachingBooking extends Model {} // Booked maintenance orders

TeachingBooking.init(
  
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    TeachingJobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'teaching_job_id', 
      references: {
        model: 'teaching_jobs', // name of the related table 
        key: 'id',
      },
    },

    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_i_d',
      references: {
        model: 'users', // name of the related table
        key: 'id',
      },
    },

    TeachOrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'teach_order_i_d',
      references: {
        model: 't_orders', // name of the related table 
        key: 'id',
      },
    },


    dateStartScheduled: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateEndScheduled: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    isBooked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'teaching_bkgs',
    uniqueKeys: {
      teach_booking_unique: {
        fields: ['user_i_d', 'teaching_job_id', 'teach_order_i_d'], // Use underscored names
      },
    },
  }
);

module.exports = TeachingBooking;




