<template>
  <div class="container">
    <h2 class="product-name">{{ info.productId }}</h2>
    <div v-for="rowKey of infoRows" :key="rowKey" class="row">
      <span class="row-label">{{ rowKey }}</span>
      <span class="row-value">{{ getInfo(rowKey) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PriceInfo',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      infoRows: ['price', 'bid', 'ask', 'high', 'low', 'volume']
    }
  },
  methods: {
    getInfo(rowKey) {
      switch (rowKey) {
        case 'volume': {
          const volume = this.info[rowKey];
          return volume > 10 ? Number(volume).toPrecision(8) : volume;
        }
        default:
          return this.info[rowKey].toFixed(8);
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 12rem;
  background: #37474f;
  margin: 1rem;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.3);
}
.product-name {
  color: white;
  text-transform: uppercase;
  margin: 0 0 1rem;
}
.row {
  display: flex;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: white;
  justify-content: flex-start;
  width: 100%;
  padding: 0 0.5rem;
}
.row-label {
  font-weight: 700;
  text-transform: uppercase;
}
.row-value {
  margin-left: auto;
}
</style>
