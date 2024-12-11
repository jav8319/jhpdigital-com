const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../../config/connection');

class TeachingJob extends Model {} // Booked maintenance orders

TeachingJob.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    TeachingJobName: {
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
    PreviousT_job: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    TaskCode: {
      type: DataTypes.STRING, 
      allowNull: false,
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
    modelName: 'teaching_jobs',
  }
);

module.exports = TeachingJob;




