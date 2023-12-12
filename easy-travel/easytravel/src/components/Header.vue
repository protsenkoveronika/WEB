<template>
  <header>
    <h1>EasyTravel</h1>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/FAQ">FAQ</router-link></li>
        <li><router-link to="/Contacts">Contacts</router-link></li>
        <a class="logOut" v-if="logCheck" style="margin-right: 10px; cursor: pointer;" @click="logOut">Log out</a>
        <li v-else>
          <router-link to="/LogIn" style="margin-right: 10px">Log in</router-link>
          <router-link to="/SignUp">Sign up</router-link>
        </li>
        <li v-if="adminCheck"><router-link to="/adminPage/offersTable">Admin Page</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  computed: {
    ...mapState(['logCheck', 'adminCheck']),
  },
  methods: {
    ...mapMutations(['setLogCheck', 'setAdminCheck']),

    logOut() {
      this.setLogCheck(false);
      this.setAdminCheck(false);

      localStorage.removeItem('logCheck');
      localStorage.removeItem('adminCheck');

      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
header {
  background-color: rgba(51, 51, 51, 0.96);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

header img {
  padding-right: 20px;
  height: 60px;
  width: 80px;
}

h1 {
  font-size: 3rem;
  margin: 0 10px 0 0 ;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding-left: 20px;
  padding-right: 10px;
  justify-content: center;
  display: flex;
}

nav li {
  margin-right: 10px;
  display: flex;
  flex-direction: row;
}

nav a {
  font-size: calc(0.5rem + 0.9vw);
  margin-left: 4px;
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

nav a:hover {
  color: #ffcc00;
}

p {
  margin: 0 15px 0 15px;
}
</style>