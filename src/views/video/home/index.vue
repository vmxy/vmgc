<template>
  <div>
    <v-banner></v-banner>
    <v-rec :limit="12" class="mt-12px"></v-rec>
    <v-list id="movie" :limit="12"></v-list>
    <v-list id="tv" :limit="12"></v-list>
    <v-list id="anime" :limit="12"></v-list>
    <v-list id="variety" :limit="12"></v-list>
    <v-list id="sport" :limit="12"></v-list>
    <v-list id="doc" :limit="12"></v-list>
    <v-hot :limit="12"></v-hot>
  </div>
</template>

<script setup lang="ts">
import { VBanner, VHot, VList, VRec } from "../components";
</script>

<style scoped></style>
