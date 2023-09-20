<script setup lang="ts">

import TheHeader from "~/components/TheHeader.vue";
</script>

<template>
  <div id="main-app">
    <TheAside/>
    <div class="main-content">
      <TheHeader/>
      <NuxtPage/>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/scss/global.scss' as *;

#main-app {
  display: flex;
  width: 1080px;
  margin: 0 auto;
  gap: 25px;
}

.main-content {
  width: 100%;
}
</style>