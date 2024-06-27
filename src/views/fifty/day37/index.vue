<template>
  <div class="wrapper-page">
    <title>Pokedex</title>
    <div class="poke-container">
      <div
        v-for="item in pokeList"
        :key="item.id"
        class="pokemon"
        :style="{
          backgroundColor: item.color,
        }"
      >
        <div></div>
        <div class="info">
          <div class="number">{{ item.id }}</div>
          <h1 class="name">{{ item.name }}</h1>
          <small :class="item.type">
            Type: <span>{{ item.type }}</span>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const count = 50;
let intervalId: number | null | any = null;
const pokeList = ref<any[]>([]);

const randomColor = () =>
  colors[Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)]];

const randomType = () =>
  Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)];

const addPokemon = () => {
  const pokemon = {
    id: pokeList.value.length + 1,
    name: `Pokemon ${pokeList.value.length + 1}`,
    color: randomColor(),
    type: randomType(),
  };
  pokeList.value.push(pokemon);
};
onMounted(() => {
  // // Initially populate the list with 50 pokemons
  // Array.from({ length: count }).forEach(() => addPokemon());

  // Then, start adding a new pokemon every second
  intervalId = setInterval(addPokemon, 1000);
});

onUnmounted(() => {
  // Clear the interval when the component is unmounted to avoid memory leaks
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
});
// Array.from({ length: count }).forEach((_, index) => {
//   pokeList.value.push({
//     id: index + 1,
//     name: `Pokemon ${index + 1}`,
//     type: randomType,
//     color: randomColor,
//   });
// });
</script>

<style lang="scss" scoped>
.poke-container {
  display: flex;
  flex-wrap: wrap;
  align-items: space-between;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
}

.pokemon {
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  background-color: #eee;
  box-shadow: 0 3px 15px rgb(100 100 100 / 50%);
  text-align: center;

  .info {
    margin-top: 20px;

    .name {
      margin: 15px 0 7px;
      letter-spacing: 1px;
    }

    .number {
      padding: 5px 10px;
      border-radius: 10px;
      background-color: rgb(0 0 0 / 10%);
      font-size: 0.8em;
    }
  }
}
</style>
