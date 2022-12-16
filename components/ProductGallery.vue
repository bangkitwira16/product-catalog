<script lang="ts" setup>
import { Product } from "~~/types/Product";

const props = defineProps<{
  thumbnail: Product["thumbnail"];
  images: Product["images"];
}>();

const imgGallery = ref<HTMLElement>();
const activeImage = ref<string>();
const onArrowClick = (direction: string) => {
  console.log(direction);
  if (direction === "right")
    imgGallery.value?.scroll({ left: 111, behavior: "smooth" });
  else imgGallery.value?.scroll({ left: -111, behavior: "smooth" });
};
</script>

<template>
  <div class="thumbnail">
    <img :src="activeImage ? activeImage : props.thumbnail" alt="thumbnail" />
  </div>
  <div class="img-gallery">
    <div>
      <Icon
        @click="onArrowClick('left')"
        name="ic:outline-chevron-left"
        size="2.4em"
      />
    </div>
    <div ref="imgGallery" class="img-item">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="grid-item"
        :class="image === activeImage && 'active'"
        @click="activeImage = image"
      >
        <img :src="image" alt="product images" />
      </div>
    </div>
    <div>
      <Icon
        @click="onArrowClick('right')"
        name="ic:outline-chevron-right"
        size="2.4em"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.thumbnail {
  width: 500px;
  height: 500px;
  img {
    object-fit: fill;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
}

.img-gallery {
  display: flex;
  align-items: center;
  width: 500px;
  .img-item {
    width: 430px;
    display: flex;
    align-items: center;
    margin-top: 15px;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    img {
      width: 93px;
      height: 93px;
      object-fit: cover;
      border-radius: 4px;
    }

    .grid-item {
      padding-right: 15px;
      &.active img {
        border: 3px solid #000;
      }
    }
  }

  .icon {
    cursor: pointer;
  }
}
@media (max-width: 820px) {
  .thumbnail {
    width: calc(100vw - 20px);
  }
  .img-gallery {
    width: calc(100vw - 20px);
    justify-content: center;
  }
}
</style>
