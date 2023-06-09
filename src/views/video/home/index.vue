<template>
  <div>
    <v-banner></v-banner>
    <v-hot class="mt-12px"></v-hot>
    <v-list id="movie" :limit="12"></v-list>
    <v-list id="tv" :limit="12"></v-list>
    <v-list id="anime" :limit="12"></v-list>
    <v-list id="variety" :limit="12"></v-list>
    <v-list id="sport" :limit="12"></v-list>
    <v-list id="doc" :limit="12"></v-list>
  </div>
</template>

<script setup lang="ts">
import { VBanner, VHot, VList } from "../components";
</script>

<style scoped></style>
