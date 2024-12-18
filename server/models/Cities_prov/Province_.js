const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class myprovince extends Model {} // Booked maintenance orders

myprovince.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ProvinceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true, // Enables the use of createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'myprovinces',
  }
);

module.exports = myprovince
    // const cityAdmin = process.env.ADMIN_CITY;
    // const stateAdmin = process.env.ADMIN_STATE;
    // console.log('Admin email:', emailAdmin);
    // let adminExists = await models.User.findOne({ where: { email: emailAdmin } });
    // if (!adminExists) {
    // const adminprovice = await models.Province.create({ProvinceName: stateAdmin});
    // if (adminprovice) {
    //   const adminCity = await models.City.create({CityName: cityAdmin, ProvinceId: adminprovice.dataValues.id});
    //   if (adminCity) {
        
    //   }