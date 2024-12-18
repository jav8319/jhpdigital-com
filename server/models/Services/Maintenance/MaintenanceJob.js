const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../../config/connection');

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
      type: DataTypes.STRING,
      allowNull: false,
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
    TaskCode: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    DeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'device_types', // name of the related table
        key: 'id',
      },
    },
    Obsolete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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