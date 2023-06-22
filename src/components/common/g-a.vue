<template>
  <a
    :class="['g-a', button ? 'g-a-button' : '', disabled ? 'disabled' : '', type ? 'g-a-' + type : '']"
    :href="href"
    @click.capture.stop.prevent="onOpen"
    :referrerpolicy="rel ? 'same-origin' : 'no-referrer'"
  >
    <slot> {{ label }} </slot>
  </a>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  href: {
    type: String,
  },
  label: {
    type: String,
  },
  button: {
    type: Boolean,
    default: false
  },
  rel: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "",
  },
});
const router = useRouter();
function onOpen(ev: Event) {
  ev.preventDefault();
  ev.stopPropagation();
  if (props.disabled) return;
  let url = props.href;
  router.push(url);
}
</script>

<style scoped lang="scss">
.g-a {
  white-space: nowrap;
}
.g-a-button {
  display: inline-block;
  padding: 3px 7px;
  box-sizing: border-box;
  margin: 3px 3px;
  position: relative;
}
.g-a-button::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  border: 1px solid #5a5959;
  transform-origin: 0 0;
  transform: scale(0.5);
}
.g-a-button:hover {
  background-color: #8e9c91;
}
.g-a-red {
  background-color: #bf1067;
}
.disabled {
  cursor: not-allowed;
  user-select: none;
  pointer-events: unset;
  background-color: #5a5959 !important;
}
</style>
