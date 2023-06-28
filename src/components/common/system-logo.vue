<template>
  <!--icon-local-logo-fill v-if="fill" />
  <icon-local-logo v-else /-->
  <img src="/logo.png" style="max-width: 32px;margin-left: 5px;"/>
</template>

<script lang="ts" setup>
defineOptions({ name: "SystemLogo" });

interface Props {
  /** logo是否填充 */
  fill?: boolean;
}

withDefaults(defineProps<Props>(), {
  fill: false,
});
</script>

<style scoped></style>
