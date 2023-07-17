<template>
  <div class="v-option">
    <n-form
      ref="formRef"
      :model="props"
      label-placement="left"
      label-align="right"
      label-width="60"
      require-mark-placement="right-hanging"
      size="medium"
      :show-feedback="false"
    >
      <n-form-item :label="$t('video.menu.class')" path="inputValue">
        <n-scrollbar x-scrollable :size="0">
          <div class="v-option-line" style="">
            <n-button
              :type="query.class == item.value ? 'primary' : 'tertiary'"
              secondary
              tag="a"
              size="small"
              class="mr-5px"
              v-for="item in classs"
              :inverted="theme.header.inverted"
              @click="onChangeClass(item.value)"
            >
              {{ $t(item.label) }}
            </n-button>
          </div>
        </n-scrollbar>
      </n-form-item>
      <n-divider />

      <template v-if="/^(tv|movie)$/i.test(id)">
        <n-form-item :label="$t('video.menu.type')">
          <n-scrollbar x-scrollable :size="1">
            <div class="v-option-line">
              <n-button
                :type="query.type == item.value ? 'primary' : 'tertiary'"
                secondary
                tag="a"
                size="small"
                class="mr-5px"
                v-for="item in types"
                :inverted="theme.header.inverted"
                @click="onChangeType(item.value)"
              >
                {{ $t(item.label) }}
              </n-button>
            </div>
          </n-scrollbar>
        </n-form-item>
        <n-divider />
      </template>

      <n-form-item :label="$t('video.menu.year')">
        <n-scrollbar x-scrollable :size="1">
          <div class="v-option-line">
            <n-button
              :type="query.year == item.value ? 'primary' : 'tertiary'"
              secondary
              tag="a"
              size="small"
              class="mr-5px"
              v-for="item in video.years"
              :inverted="theme.header.inverted"
              @click="onChangeYear(item.value)"
            >
              {{ $t(item.label) }}
            </n-button>
          </div>
        </n-scrollbar>
      </n-form-item>
      <n-divider />

      <!--n-form-item :label="$t('video.menu.sort')">
        <div class="v-option-line">
          <n-button secondary tag="a" class="mr-10px" v-for="(item) in video.sorts" :inverted="theme.header.inverted">
            {{ $t(item.label) }}
          </n-button>
        </div>
      </n-form-item-->
      <div class="mb-10px" />
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { useThemeStore, useVideoStore } from "@/store";
import { classs, types } from "./config";
import { useRoute } from "vue-router";
const route = useRoute();
const { proxy } = getCurrentInstance();
const props = defineProps({
  id: {
    type: String,
    require: true,
  },
});
defineEmits({
  search: (data: { class: string; type: string; year: string }) => {},
});
const theme = useThemeStore();
const video = useVideoStore();
const query = ref({
  class: (route.query.class as string) || "all",
  type: (route.query.type as string) || "all",
  year: (route.query.year as string) || "all",
});
const years = [];
const sorts = [];

function onChangeClass(value) {
  query.value.class = value;
  proxy.$emit("search", query.value);
}
function onChangeType(value) {
  query.value.type = value;
  proxy.$emit("search", query.value);
}
function onChangeYear(value) {
  query.value.year = value;
  proxy.$emit("search", query.value);
}
</script>

<style scoped lang="scss">
.v-option {
  .v-option-line {
    white-space: nowrap;
  }

  .option-label{
    font-size: 0.2rem;
  }
  :deep(.n-form-item-label) {
    font-size: 1rem;
    padding: 0;
  }

  :deep(.n-divider) {
    margin-top: 0px;
    margin-bottom: 5px;
  }

  :deep(.n-button) {
    margin-bottom: 5px !important;
  }
}
</style>
