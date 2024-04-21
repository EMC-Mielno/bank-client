<script setup lang="ts">

</script>

<template>
  <HeaderMenu/>
  <div class="page">
    <NuxtPage/>
  </div>
  <TheFooter/>
</template>

<style lang="scss">
@use '@/assets/scss/global.scss' as *;

.page {
  max-width: 1680px;
  margin: 0 auto;
  padding-top: 123px;
  height: 98vh;
}
</style>