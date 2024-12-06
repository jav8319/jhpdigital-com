const sequelize = require('../config/connection');
const  models  = require('../models');

logProducts = async () => {

try {

    const productsWithRelations = await models.Product.findAll({
        include: [
          {
            model: models.Category, // Include related Category table
           
            attributes: ['id', 'CategoryName'], // Fetch specific columns from Category
          },
          {
            model: models.Subcategory, // Include related Subcategory table
          
            attributes: ['id', 'SubcategoryName'], // Fetch specific columns from Subcategory
          },
        ]
      });
      
      console.log(JSON.stringify(productsWithRelations, null, 2));
   
    console.log('products created successfully');
} catch (error) {
    console.error('Error creating products:', error);
} finally {
    sequelize.close();
}
};

logProducts();



