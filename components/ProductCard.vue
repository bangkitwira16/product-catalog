<script setup lang="ts">
import { Product } from "~~/types/Product";

defineProps<{
  product: Product;
}>();
defineEmits(["on-view-clicked"]);
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="imgBx">
        <img :src="product.thumbnail" :alt="product.title" height="172" />
      </div>

      <div class="contentBx">
        <h2>{{ product.title }}</h2>

        <div class="product-detail">
          <span>{{ product.brand }}</span>
          <span
            >{{ product.rating }}
            <Icon name="material-symbols:star" size="1.2em"
          /></span>
          <span>${{ product.price }}</span>
        </div>
        <a @click="$emit('on-view-clicked', product.id)">View</a>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  .card {
    position: relative;
    width: 100%;
    height: 450px;
    background: #232323;
    border-radius: 20px;
    overflow: hidden;
  }
  .card:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #1bbfe9;
    clip-path: circle(150px at 80% 20%);
    transition: 0.5s ease-in-out;
  }
  .card:hover:before {
    clip-path: circle(300px at 80% -20%);
  }
  .card:after {
    content: "Store";
    position: absolute;
    top: 30%;
    left: -20%;
    font-size: 12em;
    font-weight: 800;
    font-style: italic;
    color: rgba(255, 255, 255, 0.04);
  }
  .card .imgBx {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
    width: 100%;
    height: 100%;
    transition: 0.5s;
  }
  .card:hover .imgBx {
    top: 0%;
    transform: translateY(-25%);
    /* bug  */
  }
  .card .imgBx img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(20deg);
    width: 270px;
  }
  .card .contentBx {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    text-align: center;
    transition: 1s;
    z-index: 90;
  }
  .card:hover .contentBx {
    height: 210px;
  }
  .card .contentBx h2 {
    position: relative;
    font-weight: 600;
    letter-spacing: 1px;
    color: #fff;
    margin-bottom: 0;
    padding: 0 10px;
  }

  .product-detail {
    display: flex;
    justify-content: center;
    color: #fff;
    margin-bottom: 30px;

    span:not(:first-child):before {
      content: "|";
      margin: 0 5px;
    }
    span {
      display: flex;
      align-items: center;
    }
    svg {
      color: yellow;
    }
  }

  .card .contentBx .product-detail,
  .card .contentBx .color {
    display: flex;
    justify-content: center;
    transition: 0.5s;
    opacity: 0;
    visibility: hidden;
  }
  .card:hover .contentBx .product-detail {
    opacity: 1;
    visibility: visible;
    transition-delay: 0.5s;
  }
  .card:hover .contentBx .color {
    opacity: 1;
    visibility: visible;
    transition-delay: 0.6s;
  }
  .card .contentBx .size h3,
  .card .contentBx .color h3 {
    color: white;
    font-weight: 300;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-right: 10px;
  }
  .card .contentBx .size div {
    display: flex;
    align-items: center;
    width: auto;
    height: 26px;
    text-align: center;
    line-height: 26px;
    font-size: 14px;
    display: inline-block;
    color: #fff;
    // background: #fff;
    svg {
      color: yellow;
    }
  }
  .card .contentBx .size div:hover {
    /* other bug */
    background: #1bbfe9;
  }
  .card .contentBx .color span {
    width: 20px;
    height: 20px;
    background: #ff0;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
  }
  .card .contentBx .color span:nth-child(2) {
    background: #1bbfe9;
  }
  .card .contentBx .color span:nth-child(3) {
    background: #1b2fe9;
  }
  .card .contentBx .color span:nth-child(4) {
    background: #080481;
  }
  .card .contentBx a {
    display: inline-block;
    padding: 10px 20px;
    background: #fff;
    border-radius: 4px;
    margin-top: 10px;
    text-decoration: none;
    font-weight: 600;
    color: #111;
    opacity: 0;
    transform: translateY(50px);
    transition: 0.5s;
  }
  .card:hover .contentBx a {
    opacity: 1;
    transform: translateY(0px);
    transition-delay: 0.7s;
  }
  a {
    cursor: pointer;
  }
}
</style>
