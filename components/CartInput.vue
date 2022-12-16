<script lang="ts" setup>
const props = defineProps<{
  modelValue: number;
  stock: number;
}>();

const emit = defineEmits(["update:model-value"]);

// #region update input
const inputChange = (event: Event) => {
  emit("update:model-value", (event.target as HTMLInputElement).value);
};

const buttonCartClick = (trigger: string) => {
  let amount: number = Number(props.modelValue);
  if (trigger === "plus") emit("update:model-value", (amount = amount + 1));
  else emit("update:model-value", (amount = amount - 1));
};

const availableStock = computed(() => props.stock - props.modelValue);
// #endregion
</script>

<template>
  <div class="cart-input">
    <div class="input-group">
      <button
        class="btn-cart"
        :disabled="props.modelValue === 0"
        @click="buttonCartClick('minus')"
      >
        -
      </button>
      <input
        type="number"
        :model-value="props.modelValue"
        :value="props.modelValue"
        @change="inputChange($event)"
        :min="0"
        :max="props.stock"
      />
      <button
        class="btn-cart"
        :disabled="props.modelValue > props.stock"
        @click="buttonCartClick('plus')"
      >
        +
      </button>
    </div>
    <span class="stock"> stock: {{ availableStock }}</span>
  </div>
</template>

<style lang="scss" scoped>
.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  button.btn-cart {
    padding: 5px 12px;
    font-size: 1.3em;
    border: 1px solid #f8f8f8;
    cursor: pointer;
  }
  input {
    border: none;
    background: #fff;
    padding: 10px 5px;
    width: 48px;
    text-align: center;
    font-weight: 1.3em;
  }
  span {
    margin-left: 5px;

    &.stock {
        font-weight: 600;
    }
  }
}
.cart-input {
    text-align: center;
    width: fit-content;
}
@media (max-width: 540px) {
    .cart-input {
        margin-left: auto;
        margin-right: auto;
    }
}
</style>
