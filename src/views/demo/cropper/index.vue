<template>
  <WrapperPage :title="'cropper'">
    <img ref="imgRef" :src="imgSrc" alt="cropper image" />
  </WrapperPage>
</template>

<script setup lang="ts">
import { WrapperPage } from "@/components/WrapperPage";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { debounce } from "lodash";
import { onMounted, ref, unref } from "vue";

const props = defineProps<{
  src?: string;
  alt?: string;
  circled?: boolean;
  height?: string | number;
  crossorigin?: "" | "anonymous" | "use-credentials";
  realTimePreview?: boolean;
  options?: Cropper.Options;
}>();

const imgSrc = props.src || new URL("@/assets/images/login_left1.png", import.meta.url).href;

const imgRef = ref();
const isReady = ref(false);
const cropper = ref<Cropper | null>(null);

const defaultOptions: Cropper.Options = {
  aspectRatio: 1,
  zoomable: true,
  zoomOnTouch: true,
  zoomOnWheel: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: true,
  autoCrop: true,
  background: true,
  highlight: true,
  center: true,
  responsive: true,
  restore: true,
  checkCrossOrigin: true,
  checkOrientation: true,
  scalable: true,
  modal: true,
  guides: true,
  movable: true,
  rotatable: true,
};

const emits = defineEmits<{
  ready: [cropper: Cropper | null];
  cropend: [data: { imgBase64: string; imgInfo: Cropper.Data }];
  cropendError: [];
}>();

function realTimeCroppered() {
  props.realTimePreview && croppered();
}

const debounceRealTimeCroppered = debounce(realTimeCroppered, 80);

onMounted(() => {
  initPage();
});

const initPage = () => {
  const imgEl = unref(imgRef);
  cropper.value = new Cropper(imgEl, {
    ...defaultOptions,
    ready: () => {
      isReady.value = true;
      emits("ready", cropper.value);
    },
    crop() {
      debounceRealTimeCroppered();
    },
    zoom() {
      debounceRealTimeCroppered();
    },
    cropmove() {
      debounceRealTimeCroppered();
    },
    ...props.options,
  });
};

function croppered() {
  if (!cropper.value) {
    return;
  }
  const imgInfo = cropper.value.getData();
  const canvas = props.circled
    ? getRoundedCanvas()
    : cropper.value.getCroppedCanvas();
  canvas.toBlob((blob) => {
    if (!blob) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onloadend = (e) => {
      emits("cropend", {
        imgBase64: typeof e.target?.result === "string" ? e.target.result : "",
        imgInfo,
      });
    };
    fileReader.onerror = () => {
      emits("cropendError");
    };
  }, "image/png");
}

function getRoundedCanvas() {
  const sourceCanvas = cropper.value!.getCroppedCanvas();
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  const width = sourceCanvas.width;
  const height = sourceCanvas.height;
  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = "destination-in";
  context.beginPath();
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true,
  );
  context.fill();
  return canvas;
}
</script>
