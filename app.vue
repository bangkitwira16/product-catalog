<script lang="ts" setup>
const isCartActive = ref(false);
</script>

<template>
  <NuxtLayout>
    <Header @on-clicked-cart="isCartActive = true" />
    <NuxtPage />
    <CartDrawer :is-active="isCartActive" @on-close="isCartActive = false"/>
  </NuxtLayout>
</template>

<style lang="scss">
body {
  margin: 0;
}
</style>
