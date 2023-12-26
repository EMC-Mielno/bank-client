<script setup lang="ts">
const props = defineProps(['text'])

const errorText = ref(props.text)
</script>

<template>
  <div>
    {{ errorText }}
  </div>
</template>

<style scoped lang="scss">
div {
  border: 1px solid #f00;
  padding: 15px;
  border-radius: 5px;
  background: #ffdee6;
  margin-bottom: 10px;
}
</style>