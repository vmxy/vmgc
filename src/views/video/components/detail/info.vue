<template>
  <div>
    <n-grid cols="10" :collapsed="false" responsive="screen" :item-responsive="true" x-gap="10" y-gap="20">
      <n-gi span="10 xs:10 s:0" class="text-align-center">
        <g-image class="info-logo" :src="detail.logo" :alt="detail.desc" />
      </n-gi>
      <n-gi span="10 xs:10 s:8">
        <n-grid cols="10">
          <n-gi span="10">
            <h1 class="text-36px">{{ detail.title }}</h1>
          </n-gi>
          <n-gi span="10">
            <n-space>
              <n-button>{{ detail.year }}</n-button>
              <n-button>{{ detail.class }}</n-button>
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
                {{ detail.directors?.join("/") || "" }}
              </n-form-item>
              <n-form-item :label="$t('video.detail.actor')">
                {{ detail.actors?.join("/") || "" }}
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
import { ref, defineProps, onMounted, Ref, watch } from "vue";
import dayjs from "dayjs";
import { formatImageUrl } from "@/utils";

const props = defineProps({
  detail: {
    type: Object,
    required: true,
  },
});
const detail: Ref<NVideo.VideoDetail> = ref(props.detail as NVideo.VideoDetail);

watch(props.detail, (newVal) => {
  Object.assign(detail.value, newVal);
});
</script>

<style scoped lang="scss">
.info-logo {
  max-height: 300px;
  object-fit: cover;
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
</style>
