import http from "../http-common";

class UsersService {
    getAll() {
        return http.get("/allUsers");
    }

    get(id) {
        return http.get(`/user/${id}`);
    }

    create(user) {
        return http.post("/createUser", user);
    }

    update(id, user) {
        return http.put(`/updateUser/${id}`, user);
    }

    delete(id) {
        return http.delete(`/deleteUser/${id}`);
    }

    login(credentials) {
        return http.post("/login", credentials);
    }
}

export default new UsersService();