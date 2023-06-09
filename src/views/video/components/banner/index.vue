<template>
  <div class="banner">
    <n-carousel show-arrow autoplay>
      <a v-for="item in banners" class="carousel-img" :href="item.url" target="_blank">
        <g-image :src="item.img" :alt="item.label" />
      </a>
      <template #arrow="{ prev, next }">
        <div class="custom-arrow">
          <button type="button" class="custom-arrow--left" @click="prev">
            <icon-mdiarrow-left-thick />
          </button>
          <button type="button" class="custom-arrow--right" @click="next">
            <icon-mdiarrow-right-thick />
          </button>
        </div>
      </template>
      <template #dots="{ total, currentIndex, to }">
        <ul class="custom-dots">
          <li
            v-for="index of total"
            :key="index"
            :class="{ ['is-active']: currentIndex === index - 1 }"
            @click="to(index - 1)"
          />
        </ul>
      </template>
    </n-carousel>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { fetchBanerList } from "@/service";
const banners = ref([
  {
    url: "https://www.qq.com",
    img: "https://www.qfitv.com/upload/vod/20230412-1/489f62bbec1b12aab0c1fb06731913b6.jpg",
    label: "no",
  },
] as { url: string; img: string; label: string }[]);
onMounted(() => {
  loadBanners();
});
async function loadBanners() {
  let { data } = await fetchBanerList();
  let list = data.list || [];
  banners.value = list;
}
</script>

<style scoped lang="scss">
$maxHeight: 240px;
.banner {
  max-height: $maxHeight;
  height: auto;
  :deep(.n-carousel) {
    height: auto;
    overflow: hidden;
    height: auto;
  }
  img {
    width: 100%;
    max-height: $maxHeight;
    height: auto;
    object-fit: cover;
  }

  .custom-arrow {
    display: flex;
    position: absolute;
    bottom: 25px;
    right: 10px;
  }

  .custom-arrow button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-right: 12px;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-width: 0;
    border-radius: 8px;
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }

  .custom-arrow button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .custom-arrow button:active {
    transform: scale(0.95);
    transform-origin: center;
  }

  .custom-dots {
    display: flex;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 20px;
    left: 20px;
  }

  .custom-dots li {
    display: inline-block;
    width: 12px;
    height: 4px;
    margin: 0 3px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.4);
    transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }

  .custom-dots li.is-active {
    width: 40px;
    background: #fff;
  }
}
</style>
