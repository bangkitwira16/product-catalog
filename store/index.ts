import { createStore } from "vuex";
import { Product } from "~~/types/Product";

export interface State {
    cart: Product[]
  }

export const store = createStore<State>({
  state() {
    return {
      cart: [],
    };
  },
  getters: {
    cartSize: (state) => {
        return state.cart.length
    }
  },
  actions: {
    addToCart({ commit }, product) {
      commit("ADD_PRODUCT_TO_CART", product);
    },
    removeCart({ commit }, productId) {
        commit("REMOVE_PRODUCT_FROM_CART")
    }
  },
  mutations: {
    ADD_PRODUCT_TO_CART(state, item) {
      const productExist = state.cart.filter((product: Product) => product.id === item.id)
      if (!productExist.length) state.cart.push(item)
      else {
        const productIdx = state.cart.findIndex((product: Product) => product.id === item.id)
        state.cart[productIdx]["amount"] =  state.cart[productIdx]["amount"] + item.amount
      }
      console.log(state.cart)
    },
    REMOVE_PRODUCT_FROM_CART(state, productId) {
        const findIdx = state.cart.findIndex((product: Product) => product.id === productId)
        state.cart.splice(findIdx, 1)
    }
  },
});
