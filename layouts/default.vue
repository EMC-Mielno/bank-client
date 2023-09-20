<script setup lang="ts">

</script>

<template>
  <div id="main-app">
    <TheAside/>
    <NuxtPage/>
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

</style>