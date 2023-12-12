const db = require('../config/database.js');
const { ObjectId } = require('mongodb');

exports.getAllCategories = async () => {
    try {
        const categories = await db.mongoose.connection.collection("categories").find().toArray();
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

exports.getCategoryById = async (categoryId) => {
    try {
        const category = await db.mongoose.connection.collection("categories").findOne({ id: categoryId });
        return category;
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        throw error;
    }
};

exports.createCategory = async (newCategory) => {
    try {
        const maxIdResult = await db.mongoose.connection.collection("categories").find().sort({ id: -1 }).limit(1).toArray();
        const maxId = maxIdResult.length > 0 ? maxIdResult[0].id : 0;

        newCategory.id = maxId + 1;

        const result = await db.mongoose.connection.collection("categories").insertOne(newCategory);

        console.log("Insert result:", result); // Log the result to inspect it

        const createdCategory = await db.mongoose.connection.collection("categories").findOne({ id: newCategory.id });

        if (createdCategory) {
            return createdCategory;
        } else {
            console.error("Error creating category: Unable to retrieve created category from the database.");
            throw new Error("Unable to retrieve created category from the database.");
        }
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

exports.deleteCategoryById = async (categoryId) => {
    try {
        const result = await db.mongoose.connection.collection("categories").deleteOne({ id: categoryId });
        return result;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};

exports.updateCategoryById = async (categoryId, updatedCategoryData) => {
    try {
        const result = await db.mongoose.connection.collection("categories").updateOne(
            { id: categoryId },
            { $set: updatedCategoryData }
        );
        return result;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};
