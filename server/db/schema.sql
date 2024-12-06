DROP DATABASE IF EXISTS mysqljhpdigital_db;

CREATE DATABASE mysqljhpdigital_db;


SELECT -- Use the correct column name: category_name
    c.id AS CategoryID,
    c.category_name AS CategoryName, 
    sc.id AS SubcategoryID,
    sc.subcategory_name,
    p.id AS ProductID,
    p.product_code_num,
    p.product_name,
    p.product_description,
    p.Price,
    p.Stock
FROM 
    products p 
LEFT JOIN 
    subcategories sc ON sc.id = p.subcategory_i_d
LEFT JOIN 
    categories c ON c.id = p.category_i_d;
