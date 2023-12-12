<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <h3>Orders</h3>
      </div>
      <div class="col links">
        <router-link to="/add/order" class="btn btn-dark">Add new</router-link>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Order date</th>
          <th>Start date</th>
          <th>Finish date</th>
          <th>Offer ID</th>
          <th>User ID</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td style="min-width: 120px">{{ order.orderdate }}</td>
          <td style="min-width: 120px">{{ order.startdate }}</td>
          <td style="min-width: 120px">{{ order.stopdate }}</td>
          <td style="min-width: 90px">{{ order.offerId }}</td>
          <td style="min-width: 90px">{{ order.userId }}</td>
          <td style="display: flex;">
            <router-link :to="'/update/order/' + order.id" class="btn btn-warning btn-sm">Update</router-link>
            <button class="btn btn-danger btn-sm" @click="deleteOrder(order.id)" style="margin-left: 0.3rem">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import OrdersService from "@/services/OrdersService";

export default {
  name: "ordersTable",
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    deleteOrder(id) {
      OrdersService.delete(id)
          .then(() => {
            this.orders = this.orders.filter(order => order.id !== id);
            console.log(`Order with ID ${id} deleted successfully.`);
          })
          .catch((error) => {
            console.error(`Error deleting order with ID ${id}:`, error);
          });
    },

  },
  mounted() {
    OrdersService.getAll()
        .then((response) => {
          this.orders = response.data;
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
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