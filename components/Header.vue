<script lang="ts" setup>
import { useStore } from "vuex"

defineEmits(['on-clicked-cart'])
const store = useStore()

const totalItems = computed(() => store.getters.cartSize)
</script>

<template>
  <nav>
    <ul>
      <li>
        <a @click="$router.push('/')">Home</a>
      </li>
      <li class="cart">
        <a><Icon name="ph:shopping-cart-fill" size="1.5em" @click="$emit('on-clicked-cart')"/> </a>
        <span class="total-item">{{totalItems}}</span>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  background: #000;
  padding: 10px;

  ul {
    display: flex;
    color: #fff;
    list-style: none;
  }

  li {
    padding: 0 10px;
    cursor: pointer;

    &.cart {
        margin-left: auto;
        position: relative;
    }

    a {
        font-size: 1.2em;
    }
  }
  .total-item {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #f89500;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7em;
    bottom: 0;
    right: 3px;
  }
}
</style>
