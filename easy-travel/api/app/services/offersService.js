const db = require('../config/database.js');
const { ObjectId } = require('mongodb');

exports.getAllOffers = async () => {
    try {
        const offers = await db.mongoose.connection.collection("offers").find().toArray();
        return offers;
    } catch (error) {
        console.error("Error fetching offers:", error);
        throw error;
    }
};

exports.getOfferById = async (offerId) => {
    try {
        const offer = await db.mongoose.connection.collection("offers").findOne({ id: offerId });
        return offer;
    } catch (error) {
        console.error("Error fetching offer by ID:", error);
        throw error;
    }
};

exports.createOffer = async (newOffer) => {
    try {
        const maxIdResult = await db.mongoose.connection.collection("offers").find().sort({ id: -1 }).limit(1).toArray();
        const maxId = maxIdResult.length > 0 ? maxIdResult[0].id : 0;

        newOffer.id = maxId + 1;

        const result = await db.mongoose.connection.collection("offers").insertOne(newOffer);

        console.log("Insert result:", result); // Log the result to inspect it

        const createdOffer = await db.mongoose.connection.collection("offers").findOne({ id: newOffer.id });

        if (createdOffer) {
            return createdOffer;
        } else {
            console.error("Error creating offer: Unable to retrieve created offer from the database.");
            throw new Error("Unable to retrieve created offer from the database.");
        }
    } catch (error) {
        console.error("Error creating offer:", error);
        throw error;
    }
};


exports.deleteOfferById = async (offerId) => {
    try {
        const result = await db.mongoose.connection.collection("offers").deleteOne({ id: offerId });
        return result;
    } catch (error) {
        console.error("Error deleting offer:", error);
        throw error;
    }
};

exports.updateOfferById = async (offerId, updatedOfferData) => {
    try {
        const result = await db.mongoose.connection.collection("offers").updateOne(
            { id: offerId },
            { $set: updatedOfferData }
        );
        return result;
    } catch (error) {
        console.error("Error updating offer:", error);
        throw error;
    }
};

exports.getOffersByCategory = async (categoryName) => {
    try {
        const offers = await db.mongoose.connection.collection("offers").find({ category: categoryName }).toArray();
        return offers;
    } catch (error) {
        console.error("Error fetching offers by category:", error);
        throw error;
    }
};

