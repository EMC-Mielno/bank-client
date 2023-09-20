<script setup lang="ts">

import Transfers from "~/components/transfers.vue";
</script>

<template>
  <h1 class="main-name">Hey, Pyro</h1>
  <p class="main-suggestion">Suggestions for you</p>
  <suggestions/>
  <h2 class="main-block-header">Transfer</h2>
  <transfers/>
  <h2 class="main-block-header"><NuxtLink to="/transactions">Recent transactions ></NuxtLink></h2>
  <transaction/>
</template>

<style scoped lang="scss">
h1.main-name, p.main-suggestion {
  margin-bottom: 15px;
}
</style>