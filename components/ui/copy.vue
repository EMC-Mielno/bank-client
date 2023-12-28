<script setup lang="ts">
import {ref, defineProps} from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  }
});

const isCopied = ref(false);

const copyText = () => {
  navigator.clipboard.writeText(props.text);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 5000);
};
</script>

<template>
  <div @click="copyText" :class="{ 'copied': isCopied }">
    <img alt="" src="@/public/icons/copy-regular.svg" v-if="!isCopied"/>
    <img alt="" src="@/public/icons/check-solid.svg" v-else/>
  </div>
</template>

<style scoped lang="scss">
.copied {
  cursor: default;
}

img {
  filter: invert(1);
}
</style>