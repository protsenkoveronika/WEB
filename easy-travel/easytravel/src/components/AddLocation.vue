<template>
  <div class="row">
    <h2>Add new location</h2>
  </div>
  <div class="container mt-3">
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="formData.name" type="text" class="form-control" name="name" placeholder="Enter location name" @input="clearValidationError('name')">
          <span class="error-message">{{ validationErrors.name }}</span>
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import LocationsService from "@/services/LocationsService";

export default {
  name: "AddLocation",
  data() {
    return {
      formData: {
        name: "",
      },
      validationErrors: {
        name: "",
      },
      tableRows: []
    };
  },
  methods: {
    async submitForm() {
      const isValid = this.validateForm(
          this.formData.name
      );

      if (!isValid) {
        return;
      }

      try {
        const response = await LocationsService.create(this.formData);
        this.resetForm();
        console.log("Location created successfully:", response.data);
      } catch (error) {
        console.error("Error creating location:", error);
      }
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

    resetForm() {
      this.formData = {
        name: ""
      };
      this.validationErrors = {
        name: ""
      };
    },

    clearValidationError(field) {
      this.validationErrors[field] = "";
    },

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