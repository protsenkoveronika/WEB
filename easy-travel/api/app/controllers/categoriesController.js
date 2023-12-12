const categoriesService = require('../services/categoriesService');

exports.getAllCategories = async (request, response) => {
    try {
        const categories = await categoriesService.getAllCategories();
        response.send(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.getCategoryById = async (request, response) => {
    const categoryId = parseInt(request.params.id);

    try {
        const category = await categoriesService.getCategoryById(categoryId);
        if (category) {
            response.send(category);
        } else {
            response.status(404).send("Category not found");
        }
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.createCategory = async (request, response) => {
    const newCategory = request.body;

    try {
        const createdCategory = await categoriesService.createCategory(newCategory);
        response.send(createdCategory);
    } catch (error) {
        console.error("Error creating category:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.deleteCategoryById = async (request, response) => {
    const categoryId = parseInt(request.params.id);

    try {
        const result = await categoriesService.deleteCategoryById(categoryId);
        if (result.deletedCount === 1) {
            response.send("Category deleted successfully");
        } else {
            response.status(404).send("Category not found");
        }
    } catch (error) {
        console.error("Error deleting category:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.updateCategoryById = async (request, response) => {
    const categoryId = parseInt(request.params.id);
    const updatedCategoryData = request.body;

    try {
        const result = await categoriesService.updateCategoryById(categoryId, updatedCategoryData);
        if (result.modifiedCount === 1) {
            response.send("Category updated successfully");
        } else {
            response.status(404).send("Category not found");
        }
    } catch (error) {
        console.error("Error updating category:", error);
        response.status(500).send("Internal Server Error");
    }
};
