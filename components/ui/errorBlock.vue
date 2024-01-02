<script setup lang="ts">
const props = defineProps(['text', 'invisible'])

</script>

<template>
  <div :class="props.invisible?'invisible':''">
    {{ props.text }}
  </div>
</template>

<style scoped lang="scss">
.invisible {
  opacity: 0;
}

div {
  border: 1px solid #f00;
  padding: 15px;
  border-radius: 5px;
  background: #ffdee6;
}
</style>