<template>
  <div class="row">
    <h2>Add new offer</h2>
  </div>
  <div class="container mt-3">
    <div class="container mt-3">
      <div class="col-md-6 offset-md-3">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input v-model="formData.name" type="text" class="form-control" name="name" placeholder="Enter offer name" @input="clearValidationError('name')">
            <span class="error-message">{{ validationErrors.name }}</span>
          </div>
          <div class="form-group">
            <label for="offerId">Price</label>
            <input v-model="formData.price" type="number" class="form-control" name="price" placeholder="Enter price" min="0" @input="clearValidationError('price')">
            <span class="error-message">{{ validationErrors.price }}</span>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <input v-model="formData.description" type="text" class="form-control" name="description" placeholder="Enter offer description" @input="clearValidationError('description')">
            <span class="error-message">{{ validationErrors.name }}</span>
          </div>
          <div class="form-group">
            <label for="location">Location</label>
            <select v-model="formData.location" class="form-control" name="location" id="location" @input="clearValidationError('location')">
              <option v-for="location in existingLocations" :key="location.id">{{ location.name }}</option>
            </select>
            <span class="error-message">{{ validationErrors.location }}</span>
          </div>
          <div class="form-group">
            <label for="category">Category</label>
            <select v-model="formData.category" class="form-control" name="category" id="category" @input="clearValidationError('category')">
              <option v-for="category in existingCategories" :key="category.id">{{ category.name }}</option>
            </select>
            <span class="error-message">{{ validationErrors.category }}</span>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LocationsService from "@/services/LocationsService";
import CategoriesService from "@/services/CategoriesService";
import OffersService from "@/services/OffersService";

export default {
  name: "AddOffer",
  data() {
    return {
      formData: {
        name: "",
        price: "",
        description: "",
        location: "",
        category: "",
      },
      validationErrors: {
        name: "",
        price: "",
        description: "",
        location: "",
        category: "",
      },
      existingLocations: [],
      existingCategories: [],
      tableRows: []
    };
  },

  methods: {
    async submitForm() {
      const isValid = this.validateForm(
          this.formData.name,
          this.formData.price,
          this.formData.description,
          this.formData.location,
          this.formData.category
      );

      if (!isValid) {
        return;
      }

      try {
        const response = await OffersService.create(this.formData);
        this.resetForm();
        console.log("Offer created successfully:", response.data);
      } catch (error) {
        console.error("Error creating offer:", error);
      }
    },

    validateForm(name, price, description, location, category) {
      let isValid = true;
      this.validationErrors = {
        name: "",
        price: "",
        description: "",
        location: "",
        category: ""
      };

      if (!name.trim()) {
        isValid = false;
        this.validationErrors.name = "Enter offer name";
      }

      if (!description.trim()) {
        isValid = false;
        this.validationErrors.description = "Enter description";
      }

      if (!location.trim()) {
        isValid = false;
        this.validationErrors.location = "Choose location";
      }

      if (!category.trim()) {
        isValid = false;
        this.validationErrors.category = "Choose category";
      }

      if (!price) {
        isValid = false;
        this.validationErrors.price = "Enter price";
      }

      return isValid;
    },

    resetForm() {
      this.formData = {
        name: "",
        price: "",
        description: "",
        location: "",
        category: "",
      };
      this.validationErrors = {
        name: "",
        price: "",
        description: "",
        category: "",
        location: "",
      };
    },

    clearValidationError(field) {
      this.validationErrors[field] = "";
    },

  },

  created() {
    LocationsService.getAll()
        .then(response => {
          this.existingLocations = response.data;
        })
        .catch(error => {
          console.error("Error fetching locations:", error);
        });

    CategoriesService.getAll()
        .then(response => {
          this.existingCategories = response.data;
        })
        .catch(error => {
          console.error("Error fetching categories:", error);
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