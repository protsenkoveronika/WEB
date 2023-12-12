<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <h3>Categories</h3>
      </div>
      <div class="col links">
        <router-link to="/add/category" class="btn btn-dark">Add new</router-link>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td style="display: flex;">
            <router-link :to="'/update/category/' + category.id" class="btn btn-warning btn-sm">Update</router-link>
            <button class="btn btn-danger btn-sm" @click="deleteCategory(category.id)" style="margin-left: 0.3rem">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CategoriesService from "@/services/CategoriesService";

export default {
  name: "CategoriesTable",
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    deleteCategory(id) {
      CategoriesService.delete(id)
          .then(() => {
            this.categories = this.categories.filter(category => category.id !== id);
            console.log(`Category with ID ${id} deleted successfully.`);
          })
          .catch((error) => {
            console.error(`Error deleting category with ID ${id}:`, error);
          });
    },

  },
  mounted() {
    CategoriesService.getAll()
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
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