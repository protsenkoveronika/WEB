const locationsService = require('../services/locationsService');

exports.getAllLocations = async (request, response) => {
    try {
        const locations = await locationsService.getAllLocations();
        response.send(locations);
    } catch (error) {
        console.error("Error fetching locations:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.getLocationById = async (request, response) => {
    const locationId = parseInt(request.params.id);

    try {
        const location = await locationsService.getLocationById(locationId);
        if (location) {
            response.send(location);
        } else {
            response.status(404).send("Location not found");
        }
    } catch (error) {
        console.error("Error fetching location by ID:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.createLocation = async (request, response) => {
    const newLocation = request.body;

    try {
        const createdLocation = await locationsService.createLocation(newLocation);
        response.send(createdLocation);
    } catch (error) {
        console.error("Error creating location:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.deleteLocationById = async (request, response) => {
    const locationId = parseInt(request.params.id);

    try {
        const result = await locationsService.deleteLocationById(locationId);
        if (result.deletedCount === 1) {
            response.send("Location deleted successfully");
        } else {
            response.status(404).send("Location not found");
        }
    } catch (error) {
        console.error("Error deleting location:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.updateLocationById = async (request, response) => {
    const locationId = parseInt(request.params.id);
    const updatedLocationData = request.body;

    try {
        const result = await locationsService.updateLocationById(locationId, updatedLocationData);
        if (result.modifiedCount === 1) {
            response.send("Location updated successfully");
        } else {
            response.status(404).send("Location not found");
        }
    } catch (error) {
        console.error("Error updating location:", error);
        response.status(500).send("Internal Server Error");
    }
};
