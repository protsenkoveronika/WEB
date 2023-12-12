<template>
  <div class="row">
    <div class="col">
      <h2>Welcome to Admin Page!</h2>
    </div>
    <div class="col links">
      <router-link to="/adminPage/usersTable">Users</router-link>
      <router-link to="/adminPage/offersTable">Offers</router-link>
      <router-link to="/adminPage/ordersTable">Orders</router-link>
      <router-link to="/adminPage/locationsTable">Locations</router-link>
      <router-link to="/adminPage/categoriesTable">Categories</router-link>
    </div>
  </div>
  <div class="comp">
    <router-view name="adminPageTable" />
  </div>
</template>

<script>
export default {
  name: "AdminPage"
}
</script>

<style scoped>

.comp {
  min-height: 15rem;
}

.links {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.links a{
  display: flex;
  margin: 0 0.5rem 0 0.5rem;
  font-size: calc(0.6rem + 0.9vw);
  color: #2c3e50;
  text-decoration: none;
  //transition: color 0.3s;
}

a:hover {
  color: #ffcc00;
}

.row {
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

h2 {
  text-align: left;
  margin: 0 0 0.3rem 0;
}

.row p {
  padding: 10px;
}

.mt-3 {
  max-width: 100%;
}


@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }

  .links {
    justify-content: flex-start;
    padding: 0 0.3rem 0 0.5rem;
  }
}
</style>