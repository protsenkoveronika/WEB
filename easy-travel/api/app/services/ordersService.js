const db = require('../config/database.js');
const { ObjectId } = require('mongodb');

exports.getAllOrders = async () => {
    try {
        const orders = await db.mongoose.connection.collection("orders").find().toArray();
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

exports.getOrderById = async (orderId) => {
    try {
        const order = await db.mongoose.connection.collection("orders").findOne({ id: orderId });
        return order;
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        throw error;
    }
};

exports.createOrder = async (newOrder) => {
    try {
        const maxIdResult = await db.mongoose.connection.collection("orders").find().sort({ id: -1 }).limit(1).toArray();
        const maxId = maxIdResult.length > 0 ? maxIdResult[0].id : 0;

        newOrder.id = maxId + 1;

        const result = await db.mongoose.connection.collection("orders").insertOne(newOrder);

        console.log("Insert result:", result); // Log the result to inspect it

        const createdOrder = await db.mongoose.connection.collection("orders").findOne({ id: newOrder.id });

        if (createdOrder) {
            return createdOrder;
        } else {
            console.error("Error creating order: Unable to retrieve created order from the database.");
            throw new Error("Unable to retrieve created order from the database.");
        }
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};

exports.deleteOrderById = async (orderId) => {
    try {
        const result = await db.mongoose.connection.collection("orders").deleteOne({ id: orderId });
        return result;
    } catch (error) {
        console.error("Error deleting order:", error);
        throw error;
    }
};

exports.updateOrderById = async (orderId, updatedOrderData) => {
    try {
        const result = await db.mongoose.connection.collection("orders").updateOne(
            { id: orderId },
            { $set: updatedOrderData }
        );
        return result;
    } catch (error) {
        console.error("Error updating order:", error);
        throw error;
    }
};
