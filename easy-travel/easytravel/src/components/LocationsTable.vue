<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <h3>Locations</h3>
      </div>
      <div class="col links">
        <router-link to="/add/location" class="btn btn-dark">Add new</router-link>
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
        <tr v-for="location in locations" :key="location.id">
          <td>{{ location.id }}</td>
          <td>{{ location.name }}</td>
          <td style="display: flex;">
            <router-link :to="'/update/location/' + location.id" class="btn btn-warning btn-sm">Update</router-link>
            <button class="btn btn-danger btn-sm" @click="deleteLocation(location.id)" style="margin-left: 0.3rem">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import LocationsService from "@/services/LocationsService";

export default {
  name: "LocationsTable",
  data() {
    return {
      locations: [],
    };
  },
  methods: {
    deleteLocation(id) {
      LocationsService.delete(id)
          .then(() => {
            this.locations = this.locations.filter(location => location.id !== id);
            console.log(`Location with ID ${id} deleted successfully.`);
          })
          .catch((error) => {
            console.error(`Error deleting location with ID ${id}:`, error);
          });
    },

  },
  mounted() {
    LocationsService.getAll()
        .then((response) => {
          this.locations = response.data;
        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
        });
  },
}
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