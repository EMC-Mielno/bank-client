<script setup lang="ts">
// if (!process.server) {
//   window.location.href = '/dashboard'
// }

definePageMeta({
  layout: 'empty'
})

</script>

<template>
  <div class="huge-text">
    <span>Innovate</span>
    <span>with</span>
    <span>Mielno</span>
    <span>Bank</span>
  </div>
  <!--  min-height: 100vh;-->
</template>

<style scoped lang="scss">
.huge-text {
  font-family: 'Inter-Black', serif;
  letter-spacing: 0.09em;
  font-size: clamp(4.1875rem, .1875rem + 6.25vw, 6.75rem);
  line-height: 1.05;
  display: flex;
  flex-wrap: wrap;
  width: min-content;
  justify-content: flex-end;
  margin: 80px auto 5px auto;
}

.huge-text span{
  display: flex;
  align-items: center;
}

@media (max-width: 500px) {
  .huge-text {
    letter-spacing: -.01em;
    line-height: .95;
    font-size: clamp(4.1875rem, .1875rem + 6.25vw, 6.75rem);
  }
}

@media (max-width: 400px) {
  .huge-text {
    font-family: 'Inter', serif;
    font-weight: 600;
    width: 100%;
    font-size: xx-large;
    justify-content: center;
  }
}
</style>