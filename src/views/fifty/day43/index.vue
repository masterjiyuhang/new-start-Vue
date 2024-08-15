<template>
  <div class="wrapper-page">
    <div class="container mx-auto">
      <h1 class="text-center text-purple-400 opacity-50 !text-9xl">
        todo list
      </h1>
      <input
        type="text"
        class="todo-input"
        placeholder="Enter your todo"
        autocomplete="off"
        v-model="todoText"
        @keyup.enter.stop="addTodo"
      />
      <ul>
        <li
          v-for="(item, index) in testStore.todoList"
          :key="index"
          class="flex"
          :class="{ completed: item.completed }"
          @click.left.prevent="toggleComplete(index)"
        >
          {{ item.label }}

          <svg
            t="1723704600542"
            class="ml-auto icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1758"
            width="20"
            height="20"
            @click.stop="deleteTodo(index)"
          >
            <path
              d="M0 0h1024v1024H0z"
              fill="#2c2c2c"
              fill-opacity="0"
              p-id="1759"
            ></path>
            <path
              d="M240.448 168l2.346667 2.154667 289.92 289.941333 279.253333-279.253333a42.666667 42.666667 0 0 1 62.506667 58.026666l-2.133334 2.346667-279.296 279.210667 279.274667 279.253333a42.666667 42.666667 0 0 1-58.005333 62.528l-2.346667-2.176-279.253333-279.253333-289.92 289.962666a42.666667 42.666667 0 0 1-62.506667-58.005333l2.154667-2.346667 289.941333-289.962666-289.92-289.92a42.666667 42.666667 0 0 1 57.984-62.506667z"
              fill="#2c2c2c"
              p-id="1760"
            ></path>
          </svg>
        </li>
      </ul>
      <small>Left click to toggle completed. </small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTestStore } from "@/stores/modules/test";

const todoText = ref<string>("");

// const todoList = ref<todoItem[]>([]);
const testStore = useTestStore();
const {
  addTodoItem,
  toggleComplete: completeTodo,
  delTodoItem,
} = useTestStore();

// 添加任务
function addTodo() {
  if (todoText.value.trim()) {
    addTodoItem(todoText.value);
    todoText.value = ""; // 清空输入框
  }
}

// 切换任务完成状态
function toggleComplete(index: number) {
  completeTodo(index);
  // todoList.value[index].completed = !todoList.value[index].completed;
}

// 删除任务
function deleteTodo(index: number) {
  // todoList.value.splice(index, 1);
  delTodoItem(index);
}
</script>

<style lang="scss" scoped>
.todo-input {
  width: 100%;
  margin-bottom: 20px;
  padding: 1rem 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 2rem;
}

ul {
  padding: 0;
  list-style-type: none;
}

li {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  color: #2c2c2c;
  cursor: pointer;
}

.completed {
  background-color: #d8d8d8;
  color: #bbb;
  text-decoration: line-through;
}
</style>
