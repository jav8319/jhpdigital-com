const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

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
      references: {
        model: 'teaching_jobs', // name of the related table 
        key: 'id',
      },
    },

    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // name of the related table
        key: 'id',
      },
    },


    dateStartScheduled: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateEndtScheduled: {
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
  }
);

module.exports = TeachingBooking;




