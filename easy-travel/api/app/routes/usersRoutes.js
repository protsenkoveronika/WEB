const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController.js');

router.get("/allUsers", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
router.post("/createUser", userController.createUser);
router.delete("/deleteUser/:id", userController.deleteUserById);
router.put("/updateUser/:id", userController.updateUserById);
router.post("/login", userController.login);

module.exports = router;
