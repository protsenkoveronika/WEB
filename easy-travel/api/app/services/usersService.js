const db = require('../config/database.js');
const { ObjectId } = require('mongodb');

exports.getAllUsers = async () => {
    try {
        const users = await db.mongoose.connection.collection("users").find().toArray();
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

exports.getUserById = async (userId) => {
    try {
        const user = await db.mongoose.connection.collection("users").findOne({ id: userId });
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};

exports.createUser = async (newUser) => {
    try {
        const maxIdResult = await db.mongoose.connection.collection("users").find().sort({ id: -1 }).limit(1).toArray();
        const maxId = maxIdResult.length > 0 ? maxIdResult[0].id : 0;

        newUser.id = maxId + 1;

        const result = await db.mongoose.connection.collection("users").insertOne(newUser);

        console.log("Insert result:", result); // Log the result to inspect it

        const createdUser = await db.mongoose.connection.collection("users").findOne({ id: newUser.id });

        if (createdUser) {
            return createdUser;
        } else {
            console.error("Error creating user: Unable to retrieve created user from the database.");
            throw new Error("Unable to retrieve created user from the database.");
        }
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

exports.deleteUserById = async (userId) => {
    try {
        const result = await db.mongoose.connection.collection("users").deleteOne({ id: userId });
        return result;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

exports.updateUserById = async (userId, updatedUserData) => {
    try {
        const result = await db.mongoose.connection.collection("users").updateOne(
            { id: userId },
            { $set: updatedUserData }
        );
        return result;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

exports.getUserByEmail = async (email) => {
    console.log("Searching user");
    try {
        const user = await db.mongoose.connection.collection("users").findOne({ email: email });
        return user;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
    }
};

