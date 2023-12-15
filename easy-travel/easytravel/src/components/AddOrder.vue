<template>
  <div class="row">
    <h2>Add new order</h2>
  </div>
  <div class="container mt-3">
    <div class="container mt-3">
      <div class="col-md-6 offset-md-3">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="offerId">Offer ID</label>
            <select v-model="formData.offerId" class="form-control" name="offerId" id="offerId" placeholder="Choose ID of an offer" min="1" @input="clearValidationError('offerId')">
              <option v-for="offer in existingOffers" :key="offer.id">{{ offer.id }}</option>
            </select>
            <span class="error-message">{{ validationErrors.offerId }}</span>
          </div>
          <div class="form-group">
            <label for="userId">User ID</label>
            <select v-model="formData.userId" class="form-control" name="userId" id="userId" placeholder="Choose ID of a user" min="1" @input="clearValidationError('userId')">
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
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import OrdersService from "@/services/OrdersService";
import UsersService from "@/services/UsersService";
import OffersService from "@/services/OffersService";

export default {
  name: "AddOrder",
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
    async submitForm() {
      const isValid = this.validateForm(
          this.formData.offerId,
          this.formData.userId,
          this.formData.orderdate,
          this.formData.startdate,
          this.formData.stopdate,
      );

      if (!isValid) {
        return;
      }

      try {
        const response = await OrdersService.create(this.formData);
        this.resetForm();
        console.log("Order created successfully:", response.data);
      } catch (error) {
        console.error("Error creating order:", error);
      }
    },

    validateForm(offerId, userId, orderdate, startdate, stopdate) {
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

      if (!userId.trim()) {
        this.validationErrors.userId = "User ID is required";
        isValid = false;
      }

      if (!offerId.trim()) {
        this.validationErrors.offerId = "Offer ID is required";
        isValid = false;
      }

        return isValid;
    },

    resetForm() {
      this.formData = {
        offerId: "",
        userId: "",
        orderdate: "",
        startdate: "",
        stopdate: "",
      };
      this.validationErrors = {
        offerId: "",
        userId: "",
        orderdate: "",
        startdate: "",
        stopdate: "",
      };
    },

    clearValidationError(field) {
      this.validationErrors[field] = "";
    },
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