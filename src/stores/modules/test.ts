import { defineStore } from "pinia";
import { store } from "@/stores";
import { piniaPersistConfig } from "../storePlugin";

export const useTestStore = defineStore("test", {
  state: () => ({
    count: 0,
    name: "纪宇航",
    todoList: [] as todoItem[],
  }),
  getters: {
    double: (state) => state.count * 2,
    globalTodoList: (state) => state.todoList,
  },
  actions: {
    increment() {
      this.count++;
    },
    changeName(str: string) {
      this.name = str;
    },
    addTodoItem(str: string) {
      this.todoList.unshift({
        label: str,
        completed: false,
      });
    },
    toggleComplete(index: number) {
      this.todoList[index].completed = !this.todoList[index].completed;
    },
    delTodoItem(index: number) {
      this.todoList.splice(index, 1);
    },
  },
  persist: piniaPersistConfig("test"),
});

export function useTestStoreWithOut() {
  return useTestStore(store);
}
