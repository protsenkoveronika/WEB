import http from "../http-common";

class CategoriesService {
    getAll() {
        return http.get("/allCategories");
    }

    get(id) {
        return http.get(`/category/${id}`);
    }

    create(category) {
        return http.post("/createCategory", category);
    }

    update(id, category) {
        return http.put(`/updateCategory/${id}`, category);
    }

    delete(id) {
        return http.delete(`/deleteCategory/${id}`);
    }
}

export default new CategoriesService();
