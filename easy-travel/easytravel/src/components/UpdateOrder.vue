<template>
  <div class="row">
    <h2>Update order</h2>
  </div>
  <div class="container mt-3">
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="updateOrder">
        <div class="form-group">
          <label for="offerId">Offer ID</label>
          <select v-model="formData.offerId" class="form-control" name="offerId" id="offerId" @input="clearValidationError('offerId')">
            <option v-for="offer in existingOffers" :key="offer.id">{{ offer.id }}</option>
          </select>
          <span class="error-message">{{ validationErrors.offerId }}</span>
        </div>
        <div class="form-group">
          <label for="userId">User ID</label>
          <select v-model="formData.userId" class="form-control" name="userId" id="userId" @input="clearValidationError('userId')">
            <option v-for="user in existingUsers" :key="user.id">{{ user.id }}</option>
          </select>
          <span class="error-message">{{ validationErrors.userId }}</span>
        </div>
        <div class="form-group">
          <label for="orderdate">Date of making an order</label>
          <input v-model="formData.orderdate" type="date" class="form-control" name="orderdate" id="orderdate" :max="getCurrentDate" @input="clearValidationError('orderdate')">
          <span class="error-message">{{ validationErrors.orderdate }}</span>
        </div>
        <div class="form-group">
          <label for="startdate">Date of start</label>
          <input v-model="formData.startdate" type="date" class="form-control" name="startdate" id="startdate" @input="clearValidationError('startdate')">
          <span class="error-message">{{ validationErrors.startdate }}</span>
        </div>
        <div class="form-group">
          <label for="stopdate">Date of stop</label>
          <input v-model="formData.stopdate" type="date" class="form-control" name="stopdate" id="stopdate" @input="clearValidationError('stopdate')">
          <span class="error-message">{{ validationErrors.stopdate }}</span>
        </div>
        <button type="submit" class="btn btn-success" @click="updateOrder">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
import OffersService from "@/services/OffersService";
import OrdersService from "@/services/OrdersService";

export default {
  name: "UpdateOrder",
  props: ['id'],
  data() {
    return {
      formData: {
        offerId: "",
        userId: "",
        orderdate: "",
        startdate: "",
        stopdate: "",
      },
      validationErrors: {
        offerId: "",
        userId: "",
        orderdate: "",
        startdate: "",
        stopdate: "",
      },
      existingOffers: [],
      existingUsers: [],
    };
  },

  methods: {
    async updateOrder() {
      // eslint-disable-next-line no-unused-vars
      const { _id, ...formDataWithoutId } = this.formData;

      const isValid = this.validateForm(
          formDataWithoutId.offerId,
          formDataWithoutId.userId,
          formDataWithoutId.orderdate,
          formDataWithoutId.startdate,
          formDataWithoutId.stopdate,
      );

      if (!isValid) {
        return;
      }

      try {
        const userResponse = await UsersService.get(this.formData.userId);

        if (!userResponse.data) {
          this.validationErrors.userId = "User with this ID does not exist";
          return;
        }

        const offerResponse = await OffersService.get(this.formData.offerId);

        if (!offerResponse.data) {
          this.validationErrors.offerId = "Offer with this ID does not exist";
          return;
        }

        const response = await OrdersService.update(this.id, formDataWithoutId);

        console.log("Order updated successfully:", response.data);
      } catch (error) {
        console.error("Error updating order:", error);
      }
    },

    async validateForm(offerId, userId, orderdate, startdate, stopdate) {
      let isValid = true;
      this.validationErrors = {
        offerId: "",
        userId: "",
        orderdate: "",
        startdate: "",
        stopdate: ""
      };

      if (!orderdate.trim()) {
        this.validationErrors.orderdate = "Order date is required";
        isValid = false;
      }

      if (!startdate.trim()) {
        this.validationErrors.startdate = "Date of start is required";
        isValid = false;
      }

      if (!stopdate.trim()) {
        this.validationErrors.stopdate = "Date of stop is required";
        isValid = false;
      }

      if (new Date(startdate) > new Date(stopdate)) {
        this.validationErrors.startdate = "Start date should not be greater than stop date";
        isValid = false;
      }

      if (new Date(orderdate) > new Date(startdate)) {
        this.validationErrors.orderdate = "Order date should not be greater than start date";
        isValid = false;
      }

      if (!userId) {
        this.validationErrors.userId = "User ID is required";
        isValid = false;
      } else {
        const userResponse = await UsersService.get(userId);

        if (!userResponse.data) {
          this.validationErrors.userId = "User with this ID does not exist";
          isValid = false;
        }
      }

      if (!offerId) {
        this.validationErrors.offerId = "Offer ID is required";
        isValid = false;
      } else {
        const offerResponse = await OffersService.get(offerId);

        if (!offerResponse.data) {
          this.validationErrors.offerId = "Offer with this ID does not exist";
          isValid = false;
        }
      }

      return isValid;
    },


  },

  mounted() {
    OrdersService.get(this.id)
        .then((response) => {
          this.formData = response.data;
        })
        .catch((error) => {
          console.error("Error fetching order data:", error);
        });
  },

  computed: {
    getCurrentDate() {
      return new Date().toISOString().split("T")[0];
    },
  },

  created() {
    OffersService.getAll()
        .then(response => {
          this.existingOffers = response.data;
        })
        .catch(error => {
          console.error("Error fetching offers:", error);
        });

    UsersService.getAll()
        .then(response => {
          this.existingUsers = response.data;
        })
        .catch(error => {
          console.error("Error fetching Users:", error);
        });
  },
}
</script>

<style scoped>
.row {
  align-items: center;
  padding: 10px;
}

h2 {
  text-align: left;
  margin: 0 0 0.3rem 1rem;
}

.mt-3 {
  max-width: 100%;
  margin-bottom: 10px;
  margin-top: 0!important;
}

.error-message {
  color: red;
}
</style>