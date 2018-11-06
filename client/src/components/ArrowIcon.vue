<template>
  <div class="svg-wrapper" v-bind:style="{ transform: `rotate(${rotation})`} ">
    <svg viewBox="0 0 20 20" preserveAspectRatio="none" width="16" fill="transparent" stroke="#979797" stroke-width="1.1px">
      <path d="M1,6 L10,15 L19,6"> </path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'ArrowIcon',
  props: {
    direction: String
  },
  computed: {
    rotation() {
      return {
        'up': '180deg',
        'right': '270deg',
        'down': '0deg',
        'left': '90deg',
      }[this.direction] || 0;
    }
  }
}
</script>

<style scoped>
.svg-wrapper {
  transition: transform 0.1s ease-out;
  transform-origin: center;
}
</style>
