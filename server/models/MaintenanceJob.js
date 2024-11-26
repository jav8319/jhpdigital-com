const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class MaintenanceJob extends Model {} // Booked maintenance orders

MaintenanceJob.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    MaintenanceName: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    Duration: {
      type: DataTypes.INTEGER,//seconds
      allowNull: false,
    },
    PreviousM_job: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Obsolete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'maintenance_jobs',
  }
);

module.exports = MaintenanceJob;




