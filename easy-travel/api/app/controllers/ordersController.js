const ordersService = require('../services/ordersService');

exports.getAllOrders = async (request, response) => {
    try {
        const orders = await ordersService.getAllOrders();
        response.send(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.getOrderById = async (request, response) => {
    const orderId = parseInt(request.params.id);

    try {
        const order = await ordersService.getOrderById(orderId);
        if (order) {
            response.send(order);
        } else {
            response.status(404).send("Order not found");
        }
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.createOrder = async (request, response) => {
    const newOrder = request.body;

    try {
        const createdOrder = await ordersService.createOrder(newOrder);
        response.send(createdOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.deleteOrderById = async (request, response) => {
    const orderId = parseInt(request.params.id);

    try {
        const result = await ordersService.deleteOrderById(orderId);
        if (result.deletedCount === 1) {
            response.send("Order deleted successfully");
        } else {
            response.status(404).send("Order not found");
        }
    } catch (error) {
        console.error("Error deleting order:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.updateOrderById = async (request, response) => {
    const orderId = parseInt(request.params.id);
    const updatedOrderData = request.body;

    try {
        const result = await ordersService.updateOrderById(orderId, updatedOrderData);
        if (result.modifiedCount === 1) {
            response.send("Order updated successfully");
        } else {
            response.status(404).send("Order not found");
        }
    } catch (error) {
        console.error("Error updating order:", error);
        response.status(500).send("Internal Server Error");
    }
};
