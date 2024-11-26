const express = require('express');
const router = express.Router();
const { ProductOrder, Product, P_Order } = require('../../../models');

// Endpoint to create a product order
router.post('/product-orders', async (req, res) => {
  try {
    const { ProductID, P_OrderID } = req.body;

    // Validate relationships
    const product = await Product.findByPk(ProductID);
    if (!product) {
      return res.status(404).json({ message: `Product with ID ${ProductID} not found.` });
    }

    const pOrder = await P_Order.findByPk(P_OrderID);
    if (!pOrder) {
      return res.status(404).json({ message: `Order with ID ${P_OrderID} not found.` });
    }

    // Create new product order
    const newProductOrder = await ProductOrder.create({ ProductID, P_OrderID });

    res.status(201).json({
      message: 'Product order created successfully.',
      productOrder: newProductOrder,
    });
  } catch (error) {
    console.error('Error creating product order:', error.message);
    res.status(500).json({ message: 'Failed to create product order.', error: error.message });
  }
});

module.exports = router;
