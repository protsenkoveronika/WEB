<template>
  <div class="row">
    <h2>Update user</h2>
  </div>
  <div class="container mt-3">
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="formData.email" type="email" class="form-control" name="email" placeholder="Enter email" @input="clearValidationError('email')">
          <span class="error-message">{{ validationErrors.email }}</span>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="formData.password" type="password" class="form-control" name="password" placeholder="Enter password" @input="clearValidationError('password')">
          <span class="error-message">{{ validationErrors.password }}</span>
        </div>
        <div class="form-group">
          <label for="firstname">First Name</label>
          <input v-model="formData.firstname" type="text" class="form-control" name="firstname" placeholder="Enter first name" @input="clearValidationError('firstname')">
          <span class="error-message">{{ validationErrors.firstname }}</span>
        </div>
        <div class="form-group">
          <label for="lastname">Last Name</label>
          <input v-model="formData.lastname" type="text" class="form-control" name="lastname" placeholder="Enter last name" @input="clearValidationError('lastname')">
          <span class="error-message">{{ validationErrors.lastname }}</span>
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input v-model="formData.phone" type="text" class="form-control" name="phone" id="phone" placeholder="380" @input="clearValidationError('phone')">
          <span class="error-message">{{ validationErrors.phone }}</span>
        </div>
        <div class="form-group">
          <label for="role">Role</label>
          <select v-model="formData.role" class="form-control" name="role" id="role">
            <option>User</option>
            <option>Administrator</option>
          </select>
        </div>
        <button type="submit" class="btn btn-success" @click="updateUser">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import UsersService from "../services/UsersService.js";
export default {
  name: 'UpdateUser',
  props: ['id'],
  data() {
    return {
      formData: {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        phone: '',
        role: '',
      },
      validationErrors: {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        phone: "",
      },
    };
  },
  methods: {
    async updateUser() {
      // eslint-disable-next-line no-unused-vars
      const { _id, ...formDataWithoutId } = this.formData;

      const isValid = this.validateForm(
          formDataWithoutId.password,
          formDataWithoutId.firstname,
          formDataWithoutId.lastname,
          formDataWithoutId.email,
          formDataWithoutId.phone
      );

      if (!isValid) {
        return;
      }

      UsersService.update(this.id, formDataWithoutId)
          .then(() => {
            console.log(`User with ID ${this.id} updated successfully.`);
          })
          .catch(error => {
            console.error(`Error updating user with ID ${this.id}:`, error);
          });
    },

    clearValidationError(field) {
      this.validationErrors[field] = "";
    },

    validateForm(password, firstname, lastname, email, phone) {
      let isValid = true;
      this.validationErrors = {
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
      };

      if (!password.trim()) {
        isValid = false;
        this.validationErrors.password = "Enter password";
      }

      if (!firstname.trim()) {
        isValid = false;
        this.validationErrors.firstname = "Enter firstname";
      }

      if (!lastname.trim()) {
        isValid = false;
        this.validationErrors.lastname = "Enter lastname";
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        isValid = false;
        this.validationErrors.email = "Incorrect email";
      }

      if (!/^38\d{10}$/.test(phone)) {
        isValid = false;
        this.validationErrors.phone = "Invalid phone number format";
      }

      return isValid;
    },
  },
  mounted() {
    UsersService.get(this.id)
        .then(response => {
          this.formData = response.data;
        })
        .catch(error => {
          console.error(`Error fetching user with ID ${this.id}:`, error);
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