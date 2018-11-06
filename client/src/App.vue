<template>
  <div id="app">
    <main class="container">
      <Autocomplete
        v-show="!productsLoading"
        placeholder="Select a product"
        :items="products"
        :itemToString="product => product.id"
        @on-select="handleSelect"
      >
        <template slot="label">
          Select a product
        </template>
      </Autocomplete>
      <ProductDetails v-if="selectedProduct" :product="selectedProduct"/>
    </main>
  </div>
</template>

<script>
import Autocomplete from './components/Autocomplete.vue'
import ProductDetails from './components/ProductDetails.vue'
import productApiClient from './api/productApiClient'

export default {
  name: 'app',
  components: {
    Autocomplete,
    ProductDetails
  },
  data() {
    return {
      productsLoading: true,
      products: [],
      selectedProduct: null
    }
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.productsLoading = true;
      const { data } = await productApiClient.getAllProducts();
      this.products = data;
      this.productsLoading = false;
    },
    handleSelect(item) {
      if (item) {
        this.selectedProduct = item;
      }
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
  font-family: 'Lato', sans-serif;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
}
</style>
