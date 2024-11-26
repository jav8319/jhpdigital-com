const User = require('./User');
const Category = require('./Category');
const Attribute = require('./Attribute');
const ProductAttribute = require('./ProductAttribute');
const Product = require('./Product');
const M_Order = require('./M_Order');
const MaintenanceJob = require('./MaintenanceJob');
const P_Order = require('./P_Order');
const ProductImage = require('./ProductImage');
const ProductOrder = require('./ProductOrder');
const ProductSpec = require('./ProductSpec');
const Schedule = require('./Schedule');
const Spec= require('./Spec');
const Subcategory = require('./Subcategory');
const T_Order = require('./T_Order');
const TeachingJob = require('./TeachingJob');
const UserSchedule = require('./UserSchedule');


Product.belongsToMany(Attribute, {
  through: ProductAttribute,
  foreignKey: 'ProductID',
  otherKey: 'AttributeID',
});

// An attribute can belong to many products
Attribute.belongsToMany(Product, {
  through: ProductAttribute,
  foreignKey: 'AttributeID',
  otherKey: 'ProductID',
});

Product.belongsTo(Category, {
  foreignKey: 'CategoryID',
  onDelete: 'CASCADE',
});

Product.belongsTo(Subcategory, {
  foreignKey: 'SubcategoryID',
  onDelete: 'CASCADE',
  allowNull: true, // Allow null values
});


Subcategory.belongsTo(Category, {
  foreignKey: 'CategoryID',
  onDelete: 'CASCADE',
});


M_Order.hasOne(Schedule, {
  foreignKey: 'ScheduleID',
  onDelete: 'CASCADE',
});
M_Order.hasOne(MaintenanceJob, {
  foreignKey: 'MaintenanceID',
  onDelete: 'CASCADE',
});

P_Order.belongsToMany(Product, {
  through: ProductOrder,
  foreignKey: 'P_OrderID',
  otherKey: 'ProductID',
});

Product.belongsToMany(P_Order, {
  through: ProductOrder,
  foreignKey: 'ProductID',
  otherKey: 'P_OrderID',
});

ProductImage.belongsTo(Product, {
  foreignKey: 'ProductID',
  onDelete: 'CASCADE',
});
Product.hasMany(ProductImage, {
  foreignKey: 'ProductID',
  onDelete: 'CASCADE',
});

Schedule.belongsToMany(User, {
  through: UserSchedule,
  foreignKey: 'ScheduleID',
  otherKey: 'UserID',
});

User.belongsToMany(Schedule, {
  through: UserSchedule,
  foreignKey: 'UserID',
  otherKey: 'ScheduleID',
});

Spec.belongsToMany(Product, {
  through: ProductSpec,
  foreignKey: 'SpecID',
  otherKey: 'ProductID',
});

Product.belongsToMany(Spec, {
  through: ProductSpec,
  foreignKey: 'ProductID',
  otherKey: 'SpecID',
});

T_Order.hasOne(TeachingJob, {
  foreignKey: 'TeachingJobID',
  onDelete: 'CASCADE',
});

T_Order.hasOne(Schedule, {
  foreignKey: 'ScheduleID',
  onDelete: 'CASCADE',
});


module.exports = {
User,
Category,
Attribute,
ProductAttribute,
Product,
M_Order,
MaintenanceJob,
P_Order,
ProductAttribute,
ProductImage,
ProductOrder,
ProductSpec,
Schedule,
Spec,
Subcategory,
T_Order,
TeachingJob,
UserSchedule
};
