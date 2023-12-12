const db = require('../config/database.js');
const { ObjectId } = require('mongodb');

exports.getAllLocations = async () => {
    try {
        const locations = await db.mongoose.connection.collection("locations").find().toArray();
        return locations;
    } catch (error) {
        console.error("Error fetching locations:", error);
        throw error;
    }
};

exports.getLocationById = async (locationId) => {
    try {
        const location = await db.mongoose.connection.collection("locations").findOne({ id: locationId });
        return location;
    } catch (error) {
        console.error("Error fetching location by ID:", error);
        throw error;
    }
};

exports.createLocation = async (newLocation) => {
    try {
        const maxIdResult = await db.mongoose.connection.collection("locations").find().sort({ id: -1 }).limit(1).toArray();
        const maxId = maxIdResult.length > 0 ? maxIdResult[0].id : 0;

        newLocation.id = maxId + 1;

        const result = await db.mongoose.connection.collection("locations").insertOne(newLocation);

        console.log("Insert result:", result); // Log the result to inspect it

        const createdLocation = await db.mongoose.connection.collection("locations").findOne({ id: newLocation.id });

        if (createdLocation) {
            return createdLocation;
        } else {
            console.error("Error creating location: Unable to retrieve created location from the database.");
            throw new Error("Unable to retrieve created location from the database.");
        }
    } catch (error) {
        console.error("Error creating location:", error);
        throw error;
    }
};

exports.deleteLocationById = async (locationId) => {
    try {
        const result = await db.mongoose.connection.collection("locations").deleteOne({ id: locationId });
        return result;
    } catch (error) {
        console.error("Error deleting location:", error);
        throw error;
    }
};

exports.updateLocationById = async (locationId, updatedLocationData) => {
    try {
        const result = await db.mongoose.connection.collection("locations").updateOne(
            { id: locationId },
            { $set: updatedLocationData }
        );
        return result;
    } catch (error) {
        console.error("Error updating location:", error);
        throw error;
    }
};

