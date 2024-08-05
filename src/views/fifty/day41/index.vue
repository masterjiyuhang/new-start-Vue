<template>
  <div class="text-center wrapper-page day41-page">
    <h1>Verify Your Account</h1>
    <p>
      We emailed you the six digit code to x@email.com
      <br />
      Enter the code below to confirm your email address.
    </p>
    <div class="code-container">
      <input
        v-for="(item, index) in 6"
        ref="codeRef"
        :key="item"
        type="number"
        class="code"
        placeholder="0"
        min="0"
        max="9"
        required
      />
    </div>
    <small class="info">
      This is design only. We didn't actually send you an email as we don't have
      your email, right?
    </small>
  </div>
</template>

<script setup lang="ts">
const codeRef = ref();
onMounted(() => {
  codeRef.value.forEach((code, idx) => {
    code.addEventListener("keydown", (e) => {
      if (e.key >= 0 && e.key <= 9) {
        codeRef.value[idx].value = "";
        if (codeRef.value[idx + 1]) {
          setTimeout(() => codeRef.value[idx + 1].focus(), 10);
        }
      } else if (e.key === "Backspace") {
        setTimeout(() => codeRef.value[idx - 1].focus(), 10);
      }
    });
  });
});
</script>

<style scoped lang="scss">
.day41-page {
  padding: 30px;
  border: 3px solid #fff080;
  border-radius: 10px;
  text-align: center;

  @media (max-width: 600px) {
    .code-container {
      flex-wrap: wrap;
    }

    .code {
      max-width: 70px;
      height: 80px;
      font-size: 60px;
    }
  }

  .code-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px 0;

    .code {
      width: 120px;
      height: 120px;
      margin: 10px auto;
      border: 1px solid #eee;
      border-radius: 5px;
      font-size: 75px;
      font-weight: 300;
      text-align: center;
      caret-color: transparent;
      appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        appearance: none;
        margin: 0;
      }

      &:valid {
        border-color: #3498db;
        box-shadow: 0 10px 10px -5px rgb(0 0 0 / 25%);
      }
    }
  }

  .info {
    display: inline-block;
    max-width: 600px;
    padding: 10px;
    border-radius: 8px;
    background-color: #eaeaea;
    color: #777;
    font-size: 20px;
    line-height: 32px;
  }
}
</style>
