<script setup lang="ts">

const route = useRoute()

</script>

<template>
  <header>
    <NuxtLink class="logo" to="/online/dashboard">
      <img src="/logo.png" alt="Logo">
      <h1>Bank</h1>
    </NuxtLink>
    <div class="headerActions">
      <NuxtLink v-if="route.name!=='auth'" to="/auth" class="auth-button">Auth</NuxtLink>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  right: 0;
  left: 0;
  max-width: 1680px;
  margin: 0 auto;}

header .logo img {
  width: 75px
}

header .logo {
  display: flex;
  align-items: center;
  color: #2451f0;
}

.auth-button {
  background: #2451f0;
  color: white;
  padding: 8px 22px;
  border-radius: 20px;
  font-weight: bold;
}
</style>