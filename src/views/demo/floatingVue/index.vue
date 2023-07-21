<template>
  <div class="text-center wrapper-page">
    <h1>Dropdown demo</h1>

    <div class="flex justify-center gap-4">
      <VDropdown class="my-dropdown">
        <button id="dropdown-btn">Click me</button>

        <template #popper>
          <div class="p-5">✌️ Hello from v-tooltip + Vue 3</div>

          <div>
            <button v-close-popper>Close</button>
            <button v-close-popper="true">Close</button>
            <button v-close-popper="false">Don't close</button>
          </div>
        </template>
      </VDropdown>

      <button id="noop-btn">I do nothing.</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.my-dropdown {
  @apply ring ring-green-500;
}
</style>
