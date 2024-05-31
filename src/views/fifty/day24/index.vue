<template>
  <div class="wrapper-page">
    <div class="card">
      <div class="h-48 card-header animated-bg">
        <!-- <img
          :src="cardInfo.headerUrl"
          alt=""
          class="object-cover w-full h-full max-w-full"
        /> -->
      </div>

      <div class="bg-white card-content p-7">
        <h3 class="h-5 m-0 card-title animated-bg animated-bg-text">
          {{ cardInfo.title }}
        </h3>
        <p class="mx-0 mt-3 mb-5 card-excerpt text-sky-400">
          {{ cardInfo.excerpt }}
          <span class="animated-bg animated-bg-text"></span>
          <span class="animated-bg animated-bg-text"></span>
          <span class="animated-bg animated-bg-text"></span>
        </p>
        <div class="flex author">
          <div
            class="overflow-hidden rounded-full profile-img animated-bg size-10"
          >
            <img :src="cardInfo.authorUrl" alt="" />
          </div>
          <div class="author-info flex flex-col justify-around ml-2.5 w-24">
            <strong
              class="text-red-300 animated-bg animated-bg-text"
              id="name"
              >{{ cardInfo.authorName }}</strong
            >
            <small
              class="animated-bg animated-bg-text text-lime-300 mt-1.5"
              id="date"
              >{{ cardInfo.date }}</small
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const cardInfo = reactive({
  headerUrl:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80",
  title: " Lorem ipsum dolor sit amet",
  excerpt: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          perferendis`,
  authorUrl:
    "https://randomuser.me/api/portraits/men/45.jpghttps://randomuser.me/api/portraits/men/45.jpg",
  authorName: "John Doe",
  date: "Oct 08, 2023",
});
</script>

<style lang="scss" scoped>
.card {
  @keyframes bg-pos {
    0% {
      background-position: 50% 0;
    }

    100% {
      background-position: -150% 0;
    }
  }

  width: 350px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgb(220 120 210 / 20%);

  .animated-bg {
    animation: bg-pos 1s linear infinite;
    background-image: linear-gradient(
      to right,
      #f6f7f8 0%,
      #edeef1 10%,
      #f6f7f8 20%,
      #f6f7f8 100%
    );
    background-size: 200% 100%;
  }

  .animated-bg-text {
    display: inline-block;
    width: 100%;
    height: 10px;
    margin: 0;
    border-radius: 50px;
  }
}
</style>
