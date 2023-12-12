<template>
  <div class="row">
    <h2>Update category</h2>
  </div>
  <div class="container mt-3">
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="updateCategory">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="formData.name" type="text" class="form-control" name="name" placeholder="Enter category name" @input="clearValidationError('name')">
          <span class="error-message">{{ validationErrors.name }}</span>
        </div>
        <button type="submit" class="btn btn-success" @click="updateCategory">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import CategoriesService from "@/services/CategoriesService";

export default {
  name: "UpdateCategory",
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
    async updateCategory() {
      // eslint-disable-next-line no-unused-vars
      const { _id, ...formDataWithoutId } = this.formData;

      const isValid = this.validateForm(
          formDataWithoutId.name
      );

      if (!isValid) {
        return;
      }

      CategoriesService.update(this.id, formDataWithoutId)
          .then(() => {
            console.log(`Category with ID ${this.id} updated successfully.`);
          })
          .catch(error => {
            console.error(`Error updating category with ID ${this.id}:`, error);
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
        this.validationErrors.name = "Enter category name";
      }

      return isValid;
    },
  },
  mounted() {
    CategoriesService.get(this.id)
        .then(response => {
          this.formData = response.data;
        })
        .catch(error => {
          console.error(`Error fetching category with ID ${this.id}:`, error);
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