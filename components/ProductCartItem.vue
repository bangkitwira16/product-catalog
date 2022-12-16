<script lang="ts" setup>
import { Product } from "~~/types/Product";

const props = defineProps<{
  product: Partial<Product>;
  amount: number
}>();
defineEmits(['on-cart-remove'])

</script>

<template>
  <div class="cart">
    <img :src="props.product.thumbnail" alt="thumbnail" />
    <div class="desc">
      <span>{{ product.title }}</span>
      <span>${{ product.price }}</span>
    </div>
    <div class="right-ctn">
      <Icon name="mdi:trash-can" size="1.4em" @click="$emit('on-cart-remove', product.id)"/>
      <CartInput v-model="props.amount" :stock="product.stock || 0" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  display: flex;
  margin-bottom: 20px;
  .desc {
    display: flex;
    flex-direction: column;
  }
  span {
    font-weight: bold;
    margin-left: 10px;
  }
  img {
    width: 72px;
    height: 72px;
    object-fit: fill;
    border-radius: 5px;
  }
  .right-ctn {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;

    .icon {
        cursor: pointer;
    }
  }
}
</style>
