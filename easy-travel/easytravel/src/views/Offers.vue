<template>
  <div class="comp">
    <h2>Offers</h2>
    <div v-for="offer in offers" :key="offer.id" class="offer">
      <div class="offer-details">
        <h3>{{ offer.name }}</h3>
        <p>{{ offer.description }}</p>
      </div>
      <div class="offer-price">
        <p>Price: {{ offer.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import OffersService from "@/services/OffersService";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Offers",
  data() {
    return {
      offers: [],
    };
  },
  mounted() {
    this.loadOffers();
  },
  methods: {
    async loadOffers() {
      try {
        if (this.$route.params.categoryName) {
          const categoryName = this.$route.params.categoryName;
          const response = await OffersService.getOffersByCategory(categoryName);
          this.offers = response.data;
        } else {
          const response = await OffersService.getAll();
          this.offers = response.data;
        }
      } catch (error) {
        console.error("Error loading offers:", error);
      }
    },
  },
};
</script>

<style scoped>
.comp {
  min-height: 15rem;
  padding: 0.5rem ;
}

.offer {
  display: flex;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  padding: 1rem;
}

.offer-details {
  flex: 2;
}

.offer-price {
  flex: 1;
  max-width: fit-content;
}
</style>