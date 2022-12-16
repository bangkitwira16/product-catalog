<script setup lang="ts">
import { useStore } from "vuex";

withDefaults(
  defineProps<{
    isActive: boolean;
  }>(),
  {
    isActive: true,
  }
);

defineEmits(["on-close"]);
const store = useStore();

const cart = computed(() => {
  console.log(store.state.cart);
  return store.state.cart;
});

const totalItems = computed(() => store.getters.cartSize);

// #region remove cart
const onRemove = (id: number) => {
  store.dispatch("removeCart", id);
};
// #endregion
</script>
<template>
  <div class="cart-drawer" :class="!!isActive ? 'active' : ''">
    <Icon
      name="material-symbols:close"
      size="1.6em"
      class="close"
      @click="$emit('on-close')"
    />
    <div v-if="totalItems > 0" class="container">
      <ProductCartItem
        v-for="ct in cart"
        :key="ct.id"
        :product="ct"
        :amount="ct.amount || 0"
        @on-cart-remove="onRemove"
      />
    </div>
    <div v-else class="cart-empty">
      <img src="@/assets/img/empty-cart.svg" alt="" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cart-drawer {
  width: 0;
  visibility: hidden;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9;
  background: #f3f1f1;
  box-shadow: 12px 2px 2px 1px rgba(0, 0, 0, 0.5);
  transition: all 200ms linear;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  &.active {
    visibility: visible;
    width: 396px;
  }

  .close {
    float: right;
    padding: 10px;
    cursor: pointer;
  }

  .container {
    margin-top: 60px;
    padding: 10px;
  }

  .cart-items {
    align-self: flex-end;
  }

  .cart-empty {
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 540px) {
  .cart-drawer {
    &.active {
      width: 100%;
    }
  }
}
</style>
