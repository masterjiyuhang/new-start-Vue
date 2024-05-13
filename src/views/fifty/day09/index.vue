<template>
  <div
    class="wrapper-page"
    :style="{ background: bgColor, transition: 'background 1s' }"
  >
    <audio
      v-for="item in sounds"
      ref="audioRefs"
      :src="getMp3Url(item)"
      :key="item"
      :id="item"
    >
      {{ item }}
    </audio>

    <div class="flex">
      <div
        v-for="item in sounds"
        :key="item"
        class="btn"
        @click="playSound(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRandomColor } from "@/hooks/useRandomColor";

const { randomColor, color } = useRandomColor();

const bgColor = ref(color);

const sounds = ["applause", "boo", "gasp", "tada", "victory", "wrong"];
const audioRefs = ref<HTMLAudioElement[]>([]);

const getMp3Url = (str) => {
  return new URL(`./sounds/sound-board_sounds_${str}.mp3`, import.meta.url)
    .href;
};

function stopSongs() {
  audioRefs.value.forEach((song) => {
    song.pause();
    song.currentTime = 0;
  });
}
function playSound(item: string) {
  bgColor.value = randomColor(70, 120);
  stopSongs();

  const selectedSong = audioRefs.value.find((audio) => {
    return audio.id === item;
  });
  if (selectedSong) {
    selectedSong.play();
  }
}
</script>

<style lang="scss" scoped>
.wrapper-page {
  position: relative;
  overflow: hidden;
  animation: gradient-animation 2s linear infinite alternate;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 100% 100%;
  }
}

.btn {
  margin: 1rem;
  padding: 1.5rem 3rem;
  border: none;
  border-radius: 5px;
  background-color: rebeccapurple;
  color: #fff;
  font-family: inherit;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
    background-color: purple;
  }

  &:focus {
    outline: none;
  }
}
</style>
