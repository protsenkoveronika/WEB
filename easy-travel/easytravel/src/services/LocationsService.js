import http from "../http-common";

class LocationsService {
    getAll() {
        return http.get("/allLocations");
    }

    get(id) {
        return http.get(`/location/${id}`);
    }

    create(location) {
        return http.post("/createLocation", location);
    }

    update(id, location) {
        return http.put(`/updateLocation/${id}`, location);
    }

    delete(id) {
        return http.delete(`/deleteLocation/${id}`);
    }
}

export default new LocationsService();
