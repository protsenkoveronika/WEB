const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController.js');

router.get("/allOrders", ordersController.getAllOrders);
router.get("/order/:id", ordersController.getOrderById);
router.post("/createOrder", ordersController.createOrder);
router.delete("/deleteOrder/:id", ordersController.deleteOrderById);
router.put("/updateOrder/:id", ordersController.updateOrderById);

module.exports = router;