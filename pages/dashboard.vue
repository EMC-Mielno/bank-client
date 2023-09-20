<script setup lang="ts">

import TheHeader from "~/components/TheHeader.vue";
</script>

<template>
  <div id="app">
    <TheHeader/>
    <dashboard/>
  </div>
</template>
<style scoped lang="scss">
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>