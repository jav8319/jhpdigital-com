const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../../config/connection');

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
      field: 'user_i_d', // Match the underscored naming convention
      references: {
        model: 'users', // name of the related table
        key: 'id',
      },
    },
    MaintJobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'maint_job_id', // Match the underscored naming convention
      references: {
        model: 'maintenance_jobs', // name of the related table
        key: 'id',
      },
    },
    MaintOrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'maint_order_i_d', // Match the underscored naming convention
      references: {
        model: 'm_orders', // name of the related table
        key: 'id',
      },
    },
    dateStartScheduled: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'date_start_scheduled', // Match the underscored naming convention
    },
    dateEndScheduled: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'date_end_scheduled', // Match the underscored naming convention
    },
    isBooked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_booked', // Match the underscored naming convention
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'Maint_bkgs',
    uniqueKeys: {
      maint_booking_unique: {
        fields: ['user_i_d', 'maint_job_id', 'maint_order_i_d'], // Use underscored names
      },
    },
  }
);

module.exports = MaintBooking;
