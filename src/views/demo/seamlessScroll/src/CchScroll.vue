<template>
  <div :ref="`wrap${classOption['key']}`">
    <div
      :ref="'realBox' + classOption['key']"
      :style="pos"
      @mouseenter="enter"
      @mouseleave="leave"
      @touchstart.passive="touchStart"
      @touchmove.passive="touchMove"
      @touchend="touchEnd"
      @mousewheel.passive="wheel"
    >
      <div :ref="'slotList' + classOption['key']" :style="float">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CchScroll",
};
</script>

<style lang="scss" scoped></style>
