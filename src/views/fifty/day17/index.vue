<template>
  <div class="wrapper-page">
    <form @submit="handleSubmit">
      <input
        v-model="inputValue"
        type="text"
        class="search"
        placeholder="Search"
      />
    </form>
    <div class="flex flex-wrap justify-center">
      <div v-for="item in movies" :key="item.id" class="movie-item">
        <img
          :src="IMG_PATH + item.poster_path"
          :alt="item.title"
          class="movie-logo"
        />
        <div class="movie-info">
          <h3 class="mt-0">{{ item.title }}</h3>
          <span
            :class="getClassByRate(item.vote_average)"
            class="bg-[#22254b] py-1 px-2 rounded font-bold"
            >{{ item.vote_average }}</span
          >
        </div>
        <div class="overview">
          <h3>Overview</h3>
          {{ item.overview }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMovie } from "./useMovie";

const { getMovies, IMG_PATH, getClassByRate, SEARCH_API } = useMovie();

const inputValue = ref("");
const movies = ref<any>([]);

function getMoviesList() {
  getMovies().then((res) => {
    console.log(res);
    movies.value = res;
  });
}
function handleSubmit(e: Event) {
  e.preventDefault();
  console.log(e, inputValue.value);
  if (inputValue.value && inputValue.value !== "") {
    getMovies(SEARCH_API + inputValue.value).then((res) => {
      console.log("搜索结果", res);
      movies.value = res;
    });
  } else {
    getMoviesList();
  }
}
getMoviesList();
</script>

<style scoped lang="scss">
$left-bg-color: #373b69;

.search {
  padding: 0.5rem 1rem;
  border: 2px solid #7378c5;
  border-radius: 50px;
  background-color: transparent;
  color: #fff;
  font-family: inherit;
  font-size: 1rem;
}

.search::placeholder {
  color: #7378c5;
}

.search:focus {
  outline: none;
  background-color: #22254b;
}

.movie-item {
  position: relative;
  width: 300px;
  margin: 1rem;
  overflow: hidden;
  border-radius: 3px;
  background-color: $left-bg-color;
  box-shadow: 0 4px 5px rgb(0 0 0 / 20%);

  .movie-logo {
    width: 100%;
  }

  .movie-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem 1rem;
    color: #eee;
    letter-spacing: 0.5px;
    gap: 0.2rem;
  }

  .overview {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    max-height: 100%;
    padding: 2rem;
    overflow-y: auto;
    transform: translateY(101%);
    transition: transform 0.3s ease-in;
    background-color: #fff;
    color: red;
  }

  &:hover {
    .overview {
      transform: translateY(0);
    }
  }
}
</style>
