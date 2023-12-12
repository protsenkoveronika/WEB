const offersService = require('../services/offersService');

exports.getAllOffers = async (request, response) => {
    try {
        const offers = await offersService.getAllOffers();
        response.send(offers);
    } catch (error) {
        console.error("Error fetching offers:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.getOfferById = async (request, response) => {
    const offerId = parseInt(request.params.id);

    try {
        const offer = await offersService.getOfferById(offerId);
        if (offer) {
            response.send(offer);
        } else {
            response.status(404).send("Offer not found");
        }
    } catch (error) {
        console.error("Error fetching offer by ID:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.createOffer = async (request, response) => {
    const newOffer = request.body;

    try {
        const createdOffer = await offersService.createOffer(newOffer);
        response.send(createdOffer);
    } catch (error) {
        console.error("Error creating offer:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.deleteOfferById = async (request, response) => {
    const offerId = parseInt(request.params.id);

    try {
        const result = await offersService.deleteOfferById(offerId);
        if (result.deletedCount === 1) {
            response.send("Offer deleted successfully");
        } else {
            response.status(404).send("Offer not found");
        }
    } catch (error) {
        console.error("Error deleting offer:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.updateOfferById = async (request, response) => {
    const offerId = parseInt(request.params.id);
    const updatedOfferData = request.body;

    try {
        const result = await offersService.updateOfferById(offerId, updatedOfferData);
        if (result.modifiedCount === 1) {
            response.send("Offer updated successfully");
        } else {
            response.status(404).send("Offer not found");
        }
    } catch (error) {
        console.error("Error updating offer:", error);
        response.status(500).send("Internal Server Error");
    }
};

exports.getOffersByCategory = async (request, response) => {
    const categoryName = request.params.categoryName;

    try {
        const offers = await offersService.getOffersByCategory(categoryName);
        response.send(offers);
    } catch (error) {
        console.error("Error fetching offers by category:", error);
        response.status(500).send("Internal Server Error");
    }
};