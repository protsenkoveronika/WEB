const userService = require('../services/usersService');
const bcrypt = require('bcrypt');


exports.getAllUsers = async (request, response) => {
    try {
        const users = await userService.getAllUsers();
        response.send(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.getUserById = async (request, response) => {
    const userId = parseInt(request.params.id);

    try {
        const user = await userService.getUserById(userId);
        if (user) {
            response.send(user);
        } else {
            response.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.createUser = async (request, response) => {
    const newUser = request.body;

    try {
        const createdUser = await userService.createUser(newUser);
        response.send(createdUser);
    } catch (error) {
        console.error("Error creating user:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.deleteUserById = async (request, response) => {
    const userId = parseInt(request.params.id);

    try {
        const result = await userService.deleteUserById(userId);
        if (result.deletedCount === 1) {
            response.send("User deleted successfully");
        } else {
            response.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.updateUserById = async (request, response) => {
    const userId = parseInt(request.params.id);
    const updatedUserData = request.body;

    try {
        const result = await userService.updateUserById(userId, updatedUserData);
        if (result.modifiedCount === 1) {
            response.send("User updated successfully");
        } else {
            response.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Error updating user:", error);
        response.status(500).send("Internal Server Error");
    }
};


exports.login = async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await userService.getUserByEmail(email);

        if (user && user.password === password) {
            console.log("found");
            response.send({
                id: user.id,
                email: user.email,
                role: user.role,
            });
        } else {
            console.log("not found");
            response.status(401).send("Invalid email or password");
        }
    } catch (error) {
        console.error("Error during login:", error);
        response.status(500).send("Internal Server Error");
    }
};