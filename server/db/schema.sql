DROP DATABASE IF EXISTS mysqljhpdigital_db;

CREATE DATABASE mysqljhpdigital_db;


SELECT -- Use the correct column name: category_name
    c.id AS CategoryID,
    c.category_name AS CategoryName, 
    sc.id AS SubcategoryID,
    sc.subcategory_name,
    p.id AS ProductID,
    p.product_name,
    p.product_description,
FROM 
    products p 
LEFT JOIN 
    subcategories sc ON sc.id = p.subcategory_i_d
LEFT JOIN 
    categories c ON c.id = p.category_i_d;


SELECT 
    pc.id AS ProdCodeID,
    pc.prod_code,
    pc.price,
    pc.stock,
    la.id AS AttributeID,
    la.attribute_name,
    pa.attribute_value
FROM 
    product_codes pc
JOIN 
    joinList_attributes pa ON pc.id = pa.code_i_d
JOIN 
    list_attributes la ON pa.attribute_i_d = la.id;



SELECT ---- products summarize for the front page
    p.id AS ProID, -- 1
    p.category_i_d AS CtgryID,
    p.product_name AS ProName,
    p.product_description AS ProDescrptn,
    pi.image_url,
    pc.price,
    la.attribute_name,
    lav.attribute_value
FROM 
    products p
LEFT JOIN 
    product_images pi ON p.id = pi.product_i_d
LEFT JOIN 
    product_codes pc ON p.id = pc.product_i_d
LEFT JOIN 
    joinlist_attributes lav ON pc.id = lav.code_i_d
LEFT JOIN 
    list_attributes la ON lav.attribute_i_d = la.id
WHERE 
    pc.stock > 0;
