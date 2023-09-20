<script setup lang="ts">

</script>

<template>
  <h2 class="main-block-header">Showcase</h2>
  <div class="showcase">
    <div class="showcase-item">
      <h3>Open an account</h3>
      <img src="/imgs/showcase/account.png" alt="">
    </div>
    <div class="showcase-item">
      <h3>Open a business account</h3>
      <img src="/imgs/showcase/buisness-account.png" alt="">
    </div>
  </div>
</template>

<style scoped lang="scss">
.showcase {
  display: flex;
  justify-content: space-between;
}

.showcase-item {
  background: #eeeeee;
  border-radius: 15px;
  width: 43%;
  height: 150px;
  padding: 20px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: 0.2s;
}

.showcase-item:hover {
  opacity: 0.8;
}

.showcase-item img {
  position: absolute;
  right: 0;
}
</style>