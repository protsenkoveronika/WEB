import http from "../http-common";

class OrdersService {
    getAll() {
        return http.get("/allOrders");
    }

    get(id) {
        return http.get(`/order/${id}`);
    }

    create(order) {
        return http.post("/createOrder", order);
    }

    update(id, order) {
        return http.put(`/updateOrder/${id}`, order);
    }

    delete(id) {
        return http.delete(`/deleteOrder/${id}`);
    }
}

export default new OrdersService();
