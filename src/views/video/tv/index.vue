<template>
  <div>
    <v-page id="tv"></v-page>
  </div>
</template>

<script setup lang="ts">
import { useLoading } from "@/hooks";
import { useVideoStore } from "@/store";
import { VList, VOption, VPage } from "../components";
const video = useVideoStore();
</script>

<style scoped></style>
