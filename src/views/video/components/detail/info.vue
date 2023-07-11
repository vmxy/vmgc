<template>
  <div class="v-detail-info">
    <n-grid cols="10" :collapsed="false" responsive="screen" :item-responsive="true" x-gap="10" y-gap="20">
      <n-gi span="10 xs:10 s:0" class="text-align-center">
        <g-image :lazy="false" class="info-logo" :src="detail.logo" :alt="detail.desc" />
      </n-gi>
      <n-gi span="10 xs:10 s:8">
        <n-grid cols="10">
          <n-gi span="10">
            <h1 class="text-36px"><g-a :href="'/video/detail/'+detail.id">{{ detail.title }}</g-a> </h1>
          </n-gi>
          <n-gi span="10">
            <n-space>
              <n-button>{{ detail.year }}</n-button>
              <n-button>{{ $t(`video.class.${detail?.class || "other"}`) }}</n-button>
              <n-button @click="toggleFav(detail)">
                <template #icon> <icon-mdi-heart :style="{ color: hasFav ? '#ff0000' : '#ffffff' }" /> </template>
              </n-button>
            </n-space>
          </n-gi>
          <n-gi span="10" class="mt-10px">
            <n-form
              ref="formRef"
              label-placement="left"
              label-align="right"
              label-width="80"
              require-mark-placement="right-hanging"
              size="medium"
              :show-feedback="false"
            >
              <n-ellipsis expand-trigger="click" line-clamp="2" :tooltip="false">
                {{ detail.desc }}
              </n-ellipsis>
              <n-form-item :label="$t('video.detail.director')">
                <g-a v-for="(name, idx) in detail.directors" :href="`/search?q=${name}`"
                  >{{ name || "" }}{{ idx < detail.directors.length - 1 ? "/" : "" }}
                </g-a>
              </n-form-item>
              <n-form-item :label="$t('video.detail.actor')">
                <g-a v-for="(name, idx) in detail.actors" :href="`/search?q=${name}`"
                  >{{ name || "" }}{{ idx < detail.actors.length - 1 ? "/" : "" }}
                </g-a>
              </n-form-item>
              <n-form-item :label="$t('video.detail.year')">
                {{ detail.year }}
              </n-form-item>
              <n-form-item :label="$t('video.detail.quality')">
                {{ detail.quality }}
              </n-form-item>
              <n-form-item :label="$t('video.detail.updateAt')">
                {{ dayjs(detail.updateAt).format("YYYY-MM-DD HH:mm:ss") }}
              </n-form-item>
            </n-form>
          </n-gi>

          <n-gi span="10" class="actions mt-10px">
            <n-space align="center">
              <!--router-link :to="`/video/player/${detail.id}`">
                <n-button color="#e50914" :round="true">
                  <template #icon>
                    <n-icon>
                      <icon-mdi-play-outline class="text-36px" />
                    </n-icon>
                  </template>
                  播放
                </n-button>
              </router-link-->
              <!--n-button color="#e50914" :round="true">
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
            #ff69b4
          </n-button-->
            </n-space>
          </n-gi>
        </n-grid>
      </n-gi>
      <n-gi span="xs:0 s:2">
        <n-image :src="detail.logo" style="margin-top: 40px" />
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from "vue";
import dayjs from "dayjs";
import { useVideoStore } from "@/store";

const props = defineProps({
  detail: {
    type: Object,
    required: true,
  },
});
const video = useVideoStore();
const detail: Ref<NVideo.VideoDetail> = ref(props.detail as NVideo.VideoDetail);
const hasFav = ref(false);
async function toggleFav(data) {
  let has = await video.toggleFav(data);
  hasFav.value = has;
}
watch(props.detail, async (newVal) => {
  hasFav.value = false;
  Object.assign(detail.value, newVal);
  hasFav.value = await video.hasFav(newVal.id);
  if (hasFav.value) {
    video.saveFav(detail.value);
  }
});
</script>

<style scoped lang="scss">
.v-detail-info {
  .info-logo {
    max-height: 300px;
    object-fit: cover;
  }
  :deep(.n-form-item .n-form-item-blank) {
    flex-wrap: wrap; 
  }
  .actions {
    :deep(svg.inline-block) {
      margin-top: -8px;
      margin-left: -5px;
    }

    :deep(.n-button) {
      font-size: 16px;
      top: -0.1em;
    }
  }
}
</style>
