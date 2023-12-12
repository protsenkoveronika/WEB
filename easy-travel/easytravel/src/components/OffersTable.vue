<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <h3>Offers</h3>
      </div>
      <div class="col links">
        <router-link to="/add/offer" class="btn btn-dark">Add new</router-link>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Location</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="offer in offers" :key="offer.id">
          <td>{{ offer.id }}</td>
          <td>{{ offer.name }}</td>
          <td>{{ offer.price }}</td>
          <td>{{ offer.description }}</td>
          <td>{{ offer.location }}</td>
          <td>{{ offer.category }}</td>
          <td style="display: flex;">
            <router-link :to="'/update/offer/' + offer.id" class="btn btn-warning btn-sm">Update</router-link>
            <button class="btn btn-danger btn-sm" @click="deleteOffer(offer.id)" style="margin-left: 0.3rem">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import OffersService from "@/services/OffersService";

export default {
  name: "offersTable",
  data() {
    return {
      offers: [],
    };
  },
  methods: {
    deleteOffer(id) {
      OffersService.delete(id)
          .then(() => {
            this.offers = this.offers.filter(offer => offer.id !== id);
            console.log(`Offer with ID ${id} deleted successfully.`);
          })
          .catch((error) => {
            console.error(`Error deleting offer with ID ${id}:`, error);
          });
    },

  },
  mounted() {
    OffersService.getAll()
        .then((response) => {
          this.offers = response.data;
        })
        .catch((error) => {
          console.error("Error fetching offers:", error);
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