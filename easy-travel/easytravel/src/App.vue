<template>
  <div id="app">
    <Header />
    <div class="content">
      <router-view  />
    </div>
    <Footer />
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: 'App',
  components: {
    RouterView,
    Header,
    Footer,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
}
body {
  margin: 0;
}

.content {
  margin: 1rem;
}

h2 {
  font-size: calc(1.4rem + 0.9vw)!important;
}

@media (max-width: 768px) {
  header {
    flex-direction: column;
    align-items: center;
  }

  header img {
    height: 40px;
    width: 45px;
    padding: 0 10px 0  0;
  }

  h1 {
    font-size: 30px;
    margin-bottom: 10px;
  }

  nav ul {
    padding-left: 0;
    justify-content: center;
    //flex-wrap: wrap;
  }

  nav li {
    margin-right: 10px;
  }

  .image {
    width: 100%;
    margin: 10px 20px 10px 20px;
  }

  .image img {
    height: auto;
  }

  a, li {
    font-size: 13px;
  }

  h6 a {
    font-size: 1rem;
  }

  .col-sm {
    width: 90%;
    padding-bottom: 10px;
  }


}

</style>
