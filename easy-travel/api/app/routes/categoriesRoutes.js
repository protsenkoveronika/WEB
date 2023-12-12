const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController.js');

router.get("/allCategories", categoriesController.getAllCategories);
router.get("/category/:id", categoriesController.getCategoryById);
router.post("/createCategory", categoriesController.createCategory);
router.delete("/deleteCategory/:id", categoriesController.deleteCategoryById);
router.put("/updateCategory/:id", categoriesController.updateCategoryById);

module.exports = router;