const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class MaintBooking extends Model {} // Booked maintenance orders

MaintBooking.init(
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
    MaintJobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'maintenance_jobs', // name of the related table 
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
    modelName: 'Maint_bkgs',
  }
);

module.exports = MaintBooking;




