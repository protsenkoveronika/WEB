<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <h3>Users</h3>
      </div>
      <div class="col links">
        <router-link to="/add/user" class="btn btn-dark">Add new</router-link>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td style="min-width: 110px;">{{ user.firstname }}</td>
          <td style="min-width: 110px;">{{ user.lastname }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.role }}</td>
          <td style="display: flex;">
            <router-link :to="'/update/user/' + user.id" class="btn btn-warning btn-sm">Update</router-link>
            <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)" style="margin-left: 0.3rem">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default {
  name: "UsersTable",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    deleteUser(id) {
      UsersService.delete(id)
          .then(() => {
            this.users = this.users.filter(user => user.id !== id);
            console.log(`User with ID ${id} deleted successfully.`);
          })
          .catch((error) => {
            console.error(`Error deleting user with ID ${id}:`, error);
          });
    },

  },
  mounted() {
    UsersService.getAll()
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
  },
};
</script>

<style scoped>

.links {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.btn {
  font-size: 0.8rem;
  line-height: 1;
}

img {
  width: auto;
  max-width: 80%;
  max-height: 80%;
}

h3 {
  font-size: 1.5rem;
}

</style>