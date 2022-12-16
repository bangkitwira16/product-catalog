<script lang="ts" setup>
import { useStore } from "vuex";
import useProductService from "~~/composables/services/product.service";
import { Product } from "~~/types/Product";

// #region initialization
const router = useRouter();
const { getProduct } = useProductService();
const routerParamId = Number(router.currentRoute.value.params.id);
const product = ref<Product | undefined>(undefined);
const priceAfterDiscount = ref<string | undefined>(undefined);
const amount = ref<number>(1);
const store = useStore();
// #endregion

// #region product
const fetchProduct = async () => {
  const response = await getProduct(routerParamId);
  if (response) product.value = response;

  priceAfterDiscount.value = Math.round(
    (Number(product.value?.price) *
      (100 - Number(product.value?.discountPercentage))) /
      100
  ).toFixed(2);
};

// #endregion

// #region add to cart
const addToCart = () => {
  store.dispatch("addToCart", { ...product.value, amount: amount.value });
};
// #endregion

fetchProduct();
</script>

<template>
  <div class="grid-container">
    <div class="grid-item">
      <ProductGallery
        :thumbnail="product?.thumbnail || ''"
        :images="product?.images || []"
      />
    </div>
    <div class="grid-item">
      <div class="content-title">
        <h2>{{ product?.title }}</h2>
        <div class="price">
          <h3 class="discount-price">${{ product?.price }}</h3>
          <h1>${{ priceAfterDiscount }}</h1>
          <span class="discount">{{ product?.discountPercentage }}% off</span>
        </div>
      </div>
      <div class="content-detail">
        <span class="brand">{{ product?.brand }}</span>
        <span>
          {{ product?.rating }}
          <Icon name="material-symbols:star" size="1.2em" class="rating" />
        </span>
        <span><Icon name="ph:tag-fill" /> {{ product?.category }}</span>
      </div>
      <div class="description">
        <p>{{ product?.description }}</p>
      </div>
      <div class="cart-ctn">
        <CartInput v-model="amount" :stock="product?.stock || 0" />
        <button class="cart" @click="addToCart">
          <Icon name="ph:shopping-cart-fill" size="1.5em" />Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 10px;
}

.grid-item {
  z-index: 1;
  padding: 20px;
  text-align: center;
}

.content-title {
  margin-top: 15px;
  display: flex;
  align-items: center;
  text-align: left;

  h2 {
    margin: 0;
  }
}

.content-detail {
  text-align: left;
  display: flex;
  align-items: center;

  span.brand {
    margin-left: 5px;
    font-size: 0.8em;
    background-color: #000;
    color: #fff;
    border-radius: 20px;
    height: fit-content;
    padding: 6px 8px;
  }
  .icon.rating {
    color: yellow;
  }

  span:not(:first-child)::before {
    content: "|";
    margin-left: 5px;
    margin-right: 5px;
    color: #9e9b9b;
  }

  span:last-child {
    font-weight: bold;
  }
}

.price {
  padding-left: 10px;
  display: flex;
  align-items: center;

  h1,
  h3 {
    margin: 0;
  }

  .discount-price {
    text-decoration-line: line-through;
    color: #9b9b9b;
    margin-right: 5px;
  }

  span.discount {
    background-color: rgb(248, 149, 0);
    padding: 4px;
    color: #fff;
    font-size: 0.8em;
    margin-left: 5px;
    border-radius: 4px;
  }
}
.description {
  margin-top: 45px;
  text-align: left;
  padding-left: 30px;
}

.cart-ctn {
  margin-top: 60px;
  text-align: left;
  button.cart {
    cursor: pointer;
    .icon {
      margin-right: 10px;
    }

    margin-top: 30px;
    padding: 15px 30px;
    font-size: 1.4em;
    background-color: #000;
    color: #fff;
  }
}

@media (max-width: 820px) {
  .grid-container {
    grid-template-columns: repeat(1, 1fr);
  }
  .grid-item {
    padding: 0;
  }
  .cart-ctn {
    text-align: center;
  }

  .content-title {
    margin-top: 60px;
  }

  .description {
    padding-left: 15px;
  }
}
</style>
