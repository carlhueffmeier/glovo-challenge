<template>
  <h2 v-if="detailsLoading">
    <Spinner />
  </h2>
  <h2 v-else-if="error">
    {{ error }}
  </h2>
  <div v-else class="info-container">
    <PriceInfo v-for="info of priceInfo" :key="info.productId" :info="info" />
  </div>
</template>

<script>
import productApiClient from '../api/productApiClient'
import PriceInfo from './PriceInfo';
import Spinner from './Spinner';

export default {
  name: 'ProductDetails',
  components: { PriceInfo, Spinner },
  props: {
    product: Object
  },
  data() {
    return {
      detailsLoading: true,
      error: null
    }
  },
  computed: {
    priceInfo() {
      return Object.entries(this.prices)
        .reduce((priceInfo, [productId, prices]) => [
          ...priceInfo,
          {
            productId,
            ...prices
          }
        ], [])
    }
  },
  methods: {
    async fetchDetails() {
      this.error = null;
      try {
        this.detailsLoading = true;
        const { data } = await productApiClient.getPricesForProduct(this.product.id);
        this.prices = data;
      } catch (error) {
        this.error = error.message;
      }
      this.detailsLoading = false;
    }
  },
  watch: {
    product() {
      this.fetchDetails();
    }
  },
  created() {
    this.fetchDetails();
  }
}
</script>

<style scoped>
.info-container {
  margin-top: 2rem;
  flex-direction: column;
  display: flex;
}

@media (min-width: 800px) {
  .info-container {
    flex-direction: row;
  }
}
</style>
