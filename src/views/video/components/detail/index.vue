<template>
  <div>
    <v-info :detail="detail"></v-info>
    <v-line :detail="detail"></v-line>
    <v-rec :id="detail.id"></v-rec>
    <v-hot></v-hot>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, computed } from "vue";
import { ref, onMounted, Ref, watch } from "vue";
import * as service from "@/service";
import VInfo from "./info.vue";
import VLine from "./line.vue";
import { VHot, VRec } from "../";
import { useAppStore } from "@/store";

const { proxy } = getCurrentInstance();

const props = defineProps({
  id: {
    type: String,
  },
});
const app = useAppStore();
const id = computed(() => {
  let id = props.id || proxy.$route.params.id;
  return id instanceof Array ? id[0] : id;
});
const detail: Ref<NVideo.VideoDetail> = ref(<any>{ lines: [] });

onMounted(() => {
  fetchDetail(id.value);
});
async function fetchDetail(id: string) {
  let { data } = await service.fetchVideoDetail(id);
  if (!data) return data;
  Object.assign(detail.value, data);
  proxy.$route.meta.title = data.title;
  app.setTitle(data.title);

  return data;
}
watch(id, (val) => {
  fetchDetail(val);
});
</script>

<style scoped></style>
