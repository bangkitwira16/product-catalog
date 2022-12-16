<script setup lang="ts">
import { Product } from "~~/types/Product";
import useProductService from "~~/composables/services/product.service";

// #region initialization
const router = useRouter();
const { getProducts } = useProductService();
const products = ref<Product[] | undefined>([]);
// #endregion

// #region fetch products
const fetchProducts = async () => {
  const response = await getProducts();
  products.value = response;
};
// #endregion

// #region navigate product details
const navigateDetail = (id: number) => {
  router.push(`product/${id}`)
}
// #endregion

fetchProducts();
</script>
<template>
  <div class="grid-container">
    <ProductCard
      class="grid-item"
      v-for="product in products"
      :key="product.id"
      :product="product"
      @on-view-clicked="navigateDetail"
    />
  </div>
</template>

<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 10px;
}

.grid-item {
  z-index: 1;
  padding: 20px;
  text-align: center;
}

@media (max-width: 820px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 540px) {
  .grid-container {
    grid-template-columns: auto;
  }
}
</style>
