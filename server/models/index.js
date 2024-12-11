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

const M_Order = require('./Services/Maintenance/M_Order.js');
const MaintenanceJob = require('./Services/Maintenance/MaintenanceJob');
const MaintBooking = require('./Services/Maintenance/MaintBooking');

const TeachingBooking = require('./Services/Teaching/TeachingBooking');
const T_Order = require('./Services/Teaching/T_Order');
const TeachingJob = require('./Services/Teaching/TeachingJob');

const UserTask = require('./Services/UserTask');
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
Product.hasMany(ProductImage, {
  foreignKey: 'ProductID',
})

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

Spec.belongsToMany(Product, {
  through: ProductSpec,
  foreignKey: 'SpecID',
  otherKey: 'ProductID',
});


ProdCode.belongsToMany(P_Order, {
  through: ProductOrder,
  foreignKey: 'codeID',
  otherKey: 'P_OrderID',
});



Availability.belongsTo(User, {
  foreignKey: 'UserID',
  onDelete: 'CASCADE',
});



MaintenanceJob.belongsToMany(User, {
  through: MaintBooking,
  foreignKey: 'MaintJobId',
  otherKey: 'UserID',
});

MaintenanceJob.belongsToMany(M_Order, {
  through: MaintBooking,
  foreignKey: 'MaintJobId',
  otherKey: 'MaintOrderID',
});


TeachingJob.belongsToMany(User, {
  through: TeachingBooking,
  foreignKey: 'TeachingJobId',
  otherKey: 'UserID',
});
TeachingJob.belongsToMany(T_Order, {
  through: TeachingBooking,
  foreignKey: 'TeachingJobId',
  otherKey: 'TeachOrderID',
});


Task.belongsToMany(User, {
  through: UserTask,
  foreignKey: 'taskID',
  otherKey: 'UserID',
});

module.exports = {
User,
UserTask,
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
Availability,
Task
};





// ModelA.belongsToMany(ModelC, {
//   through: MoldelB,
//   foreignKey: 'XX',//Located in ModelB referencing ModelA
//   otherKey: 'YY',//Located in ModelB referencing ModelC
// });

// ModelD.belongsTo(ModelE, {
//   foreignKey: 'KK',//Located in ModelD referencing ModelE
//   onDelete: 'CASCADE',
// });

// ModelW.hasMany(ModelM, {
//   foreignKey: 'GG',//Located in ModelM referencing ModelW
//   onDelete: 'CASCADE',
// });

// ModelJ.hasOne(ModelU, {
//   foreignKey: 'PP',//Located in ModelU referencing ModelJ
//   onDelete: 'CASCADE',
// });