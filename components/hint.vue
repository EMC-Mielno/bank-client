<script setup lang="ts">

</script>

<template>
  <span class="hint-button">❔<span class="hint"><slot></slot></span></span>
</template>

<style scoped lang="scss">
span.hint-button:hover span.hint {
  display: block;
}

span.hint-button {
  position: relative;
  cursor: pointer;
}

span.hint {
  position: absolute;
  bottom: 0;
  left: 30px;
  width: 440px;
  background: #f0f1f3;
  padding: 15px;
  border-radius: 10px;
  line-height: 30px;
  border: 1px solid;
  transition: 0.2s;
  z-index: 10;
  display: none;
}
</style>