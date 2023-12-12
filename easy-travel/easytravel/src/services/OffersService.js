import http from "../http-common";

class OffersService {
    getAll() {
        return http.get("/allOffers");
    }

    get(id) {
        return http.get(`/offer/${id}`);
    }

    getOffersByCategory(categoryName) {
        return http.get(`/offersByCategory/${categoryName}`);
    }

    create(offer) {
        return http.post("/createOffer", offer);
    }

    update(id, offer) {
        return http.put(`/updateOffer/${id}`, offer);
    }

    delete(id) {
        return http.delete(`/deleteOffer/${id}`);
    }
}

export default new OffersService();
