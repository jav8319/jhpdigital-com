const myproductlist = [
    // First 5 products (already provided above)...
 
            {
              ProductGroupID: 'GRP001',
              ProductCodeNum: 'ELEC1234',
              CategoryID: "electronics",
              ProductName: 'Smartphone X10',
              product_description: 'A high-performance smartphone with a sleek design.',
              Price: 699.99,
              Stock: 50,
              PackageWidth: 10.5,
              PackageHeight: 18.2,
              PackageLength: 5.0,
              PackageWeight: 0.8,
              ProductWidth: 7.5,
              ProductHeight: 15.0,
              ProductLength: 1.0,
              ProductWeight: 0.4,
              PreviousProduct: null,
              Obsolete: false,
            },
            {
              ProductGroupID: 'GRP001',
              ProductCodeNum: 'ELECAVV1234',
              CategoryID: "electronics",
              ProductName: 'Smartphone X10',
              product_description: 'A high-performance smartphone with a sleek design.',
              Price: 699.99,
              Stock: 50,
              PackageWidth: 10.5,
              PackageHeight: 18.2,
              PackageLength: 5.0,
              PackageWeight: 0.8,
              ProductWidth: 7.5,
              ProductHeight: 15.0,
              ProductLength: 1.0,
              ProductWeight: 0.4,
              PreviousProduct: null,
              Obsolete: false,
            },

            {
              ProductGroupID: 'GRP002',
              ProductCodeNum: 'CLTH5678',
              CategoryID: 'men clothing',
              ProductName: 'Men’s T-Shirt',
              product_description: 'A comfortable cotton t-shirt for men.',
              Price: 19.99,
              Stock: 200,
              PackageWidth: 12.0,
              PackageHeight: 1.5,
              PackageLength: 15.0,
              PackageWeight: 0.3,
              ProductWidth: 12.0,
              ProductHeight: 0.5,
              ProductLength: 14.0,
              ProductWeight: 0.2,
              PreviousProduct: null,
              Obsolete: false,
            },
            
            {
              ProductGroupID: 'GRP003',
              ProductCodeNum: 'HOM0011',
              CategoryID: 'Home',
              ProductName: 'LED Lamp',
              product_description: 'Energy-efficient LED lamp for home and office use.',
              Price: 25.99,
              Stock: 80,
              PackageWidth: 15.0,
              PackageHeight: 25.0,
              PackageLength: 15.0,
              PackageWeight: 1.2,
              ProductWidth: 14.0,
              ProductHeight: 24.0,
              ProductLength: 14.0,
              ProductWeight: 1.0,
              PreviousProduct: null,
              Obsolete: false,
            },
            {
              ProductGroupID: 'GRP004',
              ProductCodeNum: 'SPT0010',
              CategoryID: 'Sports',
              ProductName: 'Yoga Mat',
              product_description: 'Non-slip yoga mat for home workouts.',
              Price: 29.99,
              Stock: 120,
              PackageWidth: 10.0,
              PackageHeight: 10.0,
              PackageLength: 60.0,
              PackageWeight: 2.0,
              ProductWidth: 10.0,
              ProductHeight: 10.0,
              ProductLength: 60.0,
              ProductWeight: 2.0,
              PreviousProduct: null,
              Obsolete: false,
            },
            {
              ProductGroupID: 'GRP005',
              ProductCodeNum: 'BKS9876',
              CategoryID: 'Books',
              ProductName: 'Fiction Bestseller',
              product_description: 'A thrilling novel from a best-selling author.',
              Price: 14.99,
              Stock: 300,
              PackageWidth: 15.0,
              PackageHeight: 3.0,
              PackageLength: 22.0,
              PackageWeight: 0.5,
              ProductWidth: 15.0,
              ProductHeight: 3.0,
              ProductLength: 22.0,
              ProductWeight: 0.5,
              PreviousProduct: null,
              Obsolete: false,
            },
            // Add 15 more products with similar structure
    {
      ProductGroupID: 'GRP007',
      ProductCodeNum: 'BTY0012',
      CategoryID: 'Beauty',
      ProductName: 'Moisturizing Cream',
      product_description: 'Hydrating cream for all skin types.',
      Price: 18.99,
      Stock: 250,
      PackageWidth: 8.0,
      PackageHeight: 8.0,
      PackageLength: 8.0,
      PackageWeight: 0.5,
      ProductWidth: 7.5,
      ProductHeight: 7.5,
      ProductLength: 7.5,
      ProductWeight: 0.4,
      PreviousProduct: null,
      Obsolete: false,
    },
    {
      ProductGroupID: 'GRP008',
      ProductCodeNum: 'HTH0020',
      CategoryID: 'Health',
      ProductName: 'Vitamin D Supplements',
      product_description: 'Daily vitamin D capsules for bone health.',
      Price: 9.99,
      Stock: 400,
      PackageWidth: 5.0,
      PackageHeight: 5.0,
      PackageLength: 10.0,
      PackageWeight: 0.3,
      ProductWidth: 4.5,
      ProductHeight: 4.5,
      ProductLength: 9.5,
      ProductWeight: 0.25,
      PreviousProduct: null,
      Obsolete: false,
    },
    {
      ProductGroupID: 'GRP009',
      ProductCodeNum: 'TOY0123',
      CategoryID: 'Toys',
      ProductName: 'Building Blocks Set',
      product_description: 'Colorful building blocks for kids aged 3+.',
      Price: 24.99,
      Stock: 100,
      PackageWidth: 25.0,
      PackageHeight: 15.0,
      PackageLength: 30.0,
      PackageWeight: 1.8,
      ProductWidth: 24.0,
      ProductHeight: 14.0,
      ProductLength: 29.0,
      ProductWeight: 1.5,
      PreviousProduct: null,
      Obsolete: false,
    },
    {
      ProductGroupID: 'GRP010',
      ProductCodeNum: 'OTHR001',
      CategoryID: 'Other',
      ProductName: 'Portable USB Fan',
      product_description: 'Compact USB-powered fan for personal use.',
      Price: 15.99,
      Stock: 300,
      PackageWidth: 12.0,
      PackageHeight: 5.0,
      PackageLength: 15.0,
      PackageWeight: 0.6,
      ProductWidth: 11.0,
      ProductHeight: 4.5,
      ProductLength: 14.5,
      ProductWeight: 0.5,
      PreviousProduct: null,
      Obsolete: false,
    },
    {
      ProductGroupID: 'GRP011',
      ProductCodeNum: 'ELEC567',
      CategoryID: 'electronics',
  
      ProductName: 'Wireless Earbuds',
      product_description: 'High-quality wireless earbuds with noise cancellation.',
      Price: 129.99,
      Stock: 100,
      PackageWidth: 10.0,
      PackageHeight: 5.0,
      PackageLength: 10.0,
      PackageWeight: 0.4,
      ProductWidth: 9.0,
      ProductHeight: 4.5,
      ProductLength: 9.0,
      ProductWeight: 0.35,
      PreviousProduct: null,
      Obsolete: false,
    },
    {
      ProductGroupID: 'GRP012',
      ProductCodeNum: 'CLTH789',
      CategoryID: 'women clothing',
      ProductName: 'Women’s Jeans',
      product_description: 'Stylish and comfortable jeans for women.',
      Price: 49.99,
      Stock: 80,
      PackageWidth: 30.0,
      PackageHeight: 4.0,
      PackageLength: 40.0,
      PackageWeight: 1.2,
      ProductWidth: 28.0,
      ProductHeight: 3.5,
      ProductLength: 38.0,
      ProductWeight: 1.0,
      PreviousProduct: null,
      Obsolete: false,
    },
    {
      ProductGroupID: 'GRP013',
      ProductCodeNum: 'SPT2222',
      CategoryID: 'Sports',
      ProductName: 'Basketball',
      product_description: 'Official size basketball for indoor and outdoor use.',
      Price: 29.99,
      Stock: 60,
      PackageWidth: 25.0,
      PackageHeight: 25.0,
      PackageLength: 25.0,
      PackageWeight: 1.5,
      ProductWidth: 24.0,
      ProductHeight: 24.0,
      ProductLength: 24.0,
      ProductWeight: 1.4,
      PreviousProduct: null,
      Obsolete: false,
    },
    {
      ProductGroupID: 'GRP014',
      ProductCodeNum: 'HTH3344',
      CategoryID:'Health',
      ProductName: 'Digital Thermometer',
      product_description: 'Accurate and fast digital thermometer.',
      Price: 19.99,
      Stock: 150,
      PackageWidth: 5.0,
      PackageHeight: 15.0,
      PackageLength: 3.0,
      PackageWeight: 0.2,
      ProductWidth: 4.5,
      ProductHeight: 14.5,
      ProductLength: 2.5,
      ProductWeight: 0.15,
      PreviousProduct: null,
      Obsolete: false,
    },
    {
      ProductGroupID: 'GRP015',
      ProductCodeNum: 'HOM5566',
      CategoryID: 'Home',
      ProductName: 'Coffee Maker',
      product_description: 'Automatic drip coffee maker with timer.',
      Price: 59.99,
      Stock: 90,
      PackageWidth: 20.0,
      PackageHeight: 30.0,
      PackageLength: 20.0,
      PackageWeight: 3.0,
      ProductWidth: 18.0,
      ProductHeight: 28.0,
      ProductLength: 18.0,
      ProductWeight: 2.5,
      PreviousProduct: null,
      Obsolete: false,
    },
    {
      ProductGroupID: 'GRP016',
      ProductCodeNum: 'BTY7777',
      CategoryID: 'Beauty',
      ProductName: 'Hair Dryer',
      product_description: 'Professional hair dryer with multiple heat settings.',
      Price: 39.99,
      Stock: 200,
      PackageWidth: 10.0,
      PackageHeight: 25.0,
      PackageLength: 20.0,
      PackageWeight: 1.8,
      ProductWidth: 9.5,
      ProductHeight: 24.5,
      ProductLength: 19.5,
      ProductWeight: 1.5,
      PreviousProduct: null,
      Obsolete: false,
    },

]

module.exports = myproductlist;