const User = require('./User');
const Category = require('./Store/Category');
const ListAttribute = require('./Store/ListAttribute');
const ProductAttribute = require('./Store/ProductAttribute');
const Product = require('./Store/Product');
const P_Order = require('./Store/P_Order');
const ProductImage = require('./Store/ProductImage');
const ProductOrder = require('./Store/ProductOrder');
const ProductSpec = require('./Store/ProductSpec');
const Spec= require('./Store/Spec');
const Subcategory = require('./Store/Subcategory');
const ProdCode = require('./Store/ProdCode');

const M_Order = require('./Services/M_Order');
const MaintenanceJob = require('./Services/MaintenanceJob');
const MaintBooking = require('./Services/MaintBooking');
const TeachingBooking = require('./Services/TeachingBooking');
const T_Order = require('./Services/T_Order');
const UserTask = require('./Services/UserTask');
const TeachingJob = require('./Services/TeachingJob');
const Availability = require('./Services/Availability');
const Task = require('./Services/Task');


Product.belongsTo(Category, {
  foreignKey: 'CategoryID',

});

Product.belongsTo(Subcategory, {
  foreignKey: 'SubcategoryID', 
});

Subcategory.belongsTo(Category, {
  foreignKey: 'CategoryID',
  onDelete: 'CASCADE',
});


Product.hasMany(ProdCode, {
  foreignKey: 'ProductID',
})


ProdCode.hasMany(ProductImage, {
  foreignKey: 'codeID',
  onDelete: 'CASCADE', // This ensures images are deleted when the product is deleted
});


// An attribute can belong to many products
ListAttribute.belongsToMany(ProdCode, {
  through: ProductAttribute,
  foreignKey: 'AttributeID',
  otherKey: 'codeID',
});
ProdCode.belongsToMany(ListAttribute, {
  through: ProductAttribute,
  foreignKey: 'codeID',
  otherKey: 'AttributeID',
});
// ProdCode.belongsToMany(ListAttribute, {
//   through: ProductAttribute,
//   foreignKey: 'codeID',
//   otherKey: 'AttributeID',
// });


Spec.belongsToMany(Product, {
  through: ProductSpec,
  foreignKey: 'SpecID',
  otherKey: 'ProductID',
});


Product.belongsToMany(P_Order, {
  through: ProductOrder,
  foreignKey: 'ProductID',
  otherKey: 'P_OrderID',
});

Availability.belongsTo(User, {
  foreignKey: 'UserID',
  onDelete: 'CASCADE',
});


M_Order.hasMany(MaintenanceJob, {
  foreignKey: 'MaintenanceID',
  onDelete: 'CASCADE',
});

MaintenanceJob.belongsToMany(User, {
  through: MaintBooking,
  foreignKey: 'UserID',
  otherKey: 'MaintJobId',
});

MaintenanceJob.hasOne((Task), {
  foreignKey: 'TaskID',
  onDelete: 'CASCADE',
});

T_Order.hasMany(TeachingJob, {
  foreignKey: 'TeachingJobID',
  onDelete: 'CASCADE',
});


TeachingJob.belongsToMany(User, {
  through: TeachingBooking,
  foreignKey: 'UserID',
  otherKey: 'TeachingJobId',
});


TeachingJob.hasOne((Task), {
  foreignKey: 'TaskID',
  onDelete: 'CASCADE',
});

User.hasMany(UserTask, {
  foreignKey: 'UserID',
  onDelete: 'CASCADE',
});

module.exports = {
User,
ProdCode,
Category,
ListAttribute,
ProductAttribute,
Product,
M_Order,
MaintenanceJob,
P_Order,
ProductImage,
ProductOrder,
ProductSpec,
Spec,
Subcategory,
T_Order,
TeachingJob,
TeachingBooking,
MaintBooking,
};
