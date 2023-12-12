<template>
  <div class="mainrow">
    <h2>Your adventure starts here</h2>
  </div>
  <div class="mainrow">
    <div class="categories_container">
      <h3>Categories</h3>
      <div class="categories">
        <router-link to="/offers" class="category">All</router-link>
        <router-link :to="'/offers/' + category.name" v-for="category in categories" :key="category.id" class="category">
          {{ category.name }}
        </router-link>
      </div>
    </div>
  </div>
  <div class="mainrow">
    <h5>About a project</h5>
    <p>Welcome to EasyTravel, your premier travel agency for unforgettable journeys. Our dedicated team of travel enthusiasts is committed to providing you with top-notch experiences that create lasting memories. We specialize in crafting customized itineraries to suit your unique preferences, whether you're seeking relaxation, adventure, or cultural immersion. At EasyTravel, your dream vacation becomes a reality.</p>
  </div>
  <div class="mainrow">
    <h5>News</h5>
    <p>Stay informed with the latest updates and happenings in the world of travel. Our news section keeps you up-to-date on travel advisories, destination highlights, and travel industry trends. From travel restrictions to must-visit destinations, we've got you covered. Join our newsletter to receive exclusive offers, travel tips, and insider insights. Your journey begins here at EasyTravel!</p>
  </div>
</template>

<script>
import CategoriesService from "@/services/CategoriesService";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    data() {
      return {
        categories: [],
      };
    },
    mounted() {
      this.loadCategories();
    },
    methods: {
      async loadCategories() {
        try {
          const response = await CategoriesService.getAll();
          this.categories = response.data;
        } catch (error) {
          console.error("Error loading categories:", error);
        }
      },
    },
  };
</script>

<style scoped>
.mainrow {
  border-top-color: rgba(42,42,42,0.53);
  border-top-style: dotted;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.38);
}

.mainrow p {
  padding: 10px;
}

.categories {
  width: available;
}

.category {
  background-color: rgba(14, 14, 14, 0.66);
  color: white;
  display: flex;
  padding: 12px;
  text-decoration: none;
  cursor: pointer;
  justify-content: space-evenly;
  align-items: center;
}

.category:hover {
  background-color: rgba(0, 0, 0, 0.66);
}

h3{
  text-align: center;
  margin: 0.7rem 0;
}

h2 {
    text-align: center;
    margin: 0;
}

h5 {
  display: flex;
  flex-wrap: wrap;
  font-weight: bold;
  margin: 0;
  background-color: rgba(255, 255, 255, 0.51);
  justify-content: center;
}

</style>