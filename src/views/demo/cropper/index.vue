<template>
  <WrapperPage :title="'cropper'">
    <img ref="imgRef" src="" alt="" />
  </WrapperPage>
</template>

<script setup lang="ts">
import { WrapperPage } from "@/components/WrapperPage";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { debounce } from "lodash";
import { Nullable } from "vitest";
import { CSSProperties, PropType, onMounted, ref, unref } from "vue";

const imgRef = ref();
const isReady = ref(false);
const cropper = ref<Nullable<Cropper>>();
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

const emits = defineEmits(["ready", "cropend", "cropendError"]);

// Real-time display preview
function realTimeCroppered() {
  props.realTimePreview && croppered();
}

const debounceRealTimeCroppered = debounce(realTimeCroppered, 80);

const props = {
  src: {
    type: String,
    required: true,
  },
  alt: { type: String },
  circled: { type: Boolean, default: false },
  height: { type: [String, Number], default: "360px" },
  crossorigin: {
    type: String as PropType<"" | "anonymous" | "use-credentials" | undefined>,
    default: undefined,
  },
  imageStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
  options: {
    type: Object,
    default: () => {},
  },
  realTimePreview: {
    type: Boolean,
    default: true,
  },
};
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

// event: return base64 and width and height information after cropping
function croppered() {
  if (!cropper.value) {
    return;
  }
  let imgInfo = cropper.value.getData();
  const canvas = props.circled
    ? getRoundedCanvas()
    : cropper.value.getCroppedCanvas();
  canvas.toBlob((blob) => {
    if (!blob) {
      return;
    }
    let fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onloadend = (e) => {
      emits("cropend", {
        imgBase64: e.target?.result ?? "",
        imgInfo,
      });
    };
    fileReader.onerror = () => {
      emits("cropendError");
    };
  }, "image/png");
}

// Get a circular picture canvas
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
    true
  );
  context.fill();
  return canvas;
}
</script>

<style scoped></style>
