<script setup lang="ts">

definePageMeta({
  layout: 'empty'
})
useHead({
  title: 'Online Bank of Mielno'
})

</script>

<template>
  <header>
    <img src="/logo.png" alt="Logo" class="logo">
    <div class="login">
      <h1>
        Hello!<br>
        Log in to Bank of Mielno
      </h1>
      <form>
        <input type="text" placeholder="Username">
        <input type="password" placeholder="Password">
        <input type="submit" value="Go">
      </form>
    </div>

  </header>
</template>

<style scoped lang="scss">

.login {
  margin: 0 auto;
  width: fit-content;
}

h1 {
  margin-bottom: 32px;
}

</style>