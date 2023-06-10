<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :style="{ width: '250px' }"
    title=""
    size="huge"
    :closable="false"
    :bordered="false"
    :segmented="{
      content: 'soft',
      footer: 'soft',
    }"
    content-style="padding: 0;margin: 0;"
  >
    <template #header-extra></template>
    <canvas ref="canvasRef" width="250px" height="250px"></canvas>
    <template #footer> </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
const canvasRef = ref<HTMLCanvasElement>();

const showModal = ref(false);
const show = async (content: string) => {
  if (ssr) return;
  showModal.value = true;
  await wait(100);
  buileQRCode({ content: content, logo: "/logo.png" });
};

defineExpose({
  show,
});
async function buileQRCode(opts: { content: string; logo?: string }) {
  const QRCode = (await import("qrcode-with-logos")) as any;
  await new QRCode({
    canvas: canvasRef.value,
    content: opts.content,
    width: 250,
    download: false,
    //image: refImg.value,
    logo: {
      src: opts.logo || "",
    },
    nodeQrCodeOptions: {
      margin: 1,
      //errorCorrectionLevel: "H",
    },
  }).toCanvas();
}
</script>

<style scoped lang="scss"></style>
