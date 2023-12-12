<template>
  <div class="row">
    <h2>Update location</h2>
  </div>
  <div class="container mt-3">
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="updateLocation">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="formData.name" type="text" class="form-control" name="name" placeholder="Enter location name" @input="clearValidationError('name')">
          <span class="error-message">{{ validationErrors.name }}</span>
        </div>
        <button type="submit" class="btn btn-success" @click="updateLocation">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import LocationsService from "@/services/LocationsService";

export default {
  name: "UpdateLocation",
  props: ['id'],
  data() {
    return {
      formData: {
        name: ''
      },
      validationErrors: {
        name: ""
      },
    };
  },
  methods: {
    async updateLocation() {
      // eslint-disable-next-line no-unused-vars
      const { _id, ...formDataWithoutId } = this.formData;

      const isValid = this.validateForm(
          formDataWithoutId.name
      );

      if (!isValid) {
        return;
      }

      LocationsService.update(this.id, formDataWithoutId)
          .then(() => {
            console.log(`Location with ID ${this.id} updated successfully.`);
          })
          .catch(error => {
            console.error(`Error updating location with ID ${this.id}:`, error);
          });
    },

    clearValidationError(field) {
      this.validationErrors[field] = "";
    },

    validateForm(name) {
      let isValid = true;
      this.validationErrors = {
        name: ""
      };

      if (!name.trim()) {
        isValid = false;
        this.validationErrors.name = "Enter location name";
      }

      return isValid;
    },
  },
  mounted() {
    LocationsService.get(this.id)
        .then(response => {
          this.formData = response.data;
        })
        .catch(error => {
          console.error(`Error fetching location with ID ${this.id}:`, error);
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