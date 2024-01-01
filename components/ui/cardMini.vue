<script setup lang="ts">

import Copy from "~/components/ui/copy.vue";

const props = defineProps(['number'])
const account_number = props.number
</script>

<template>
  <div class="card-icon">
    <div class="account-number">
      <p>{{ formatCardNumber(account_number) }}</p>
      <copy :text="account_number"/>
    </div>
  </div>
</template>

<style scoped lang="scss">

.card-icon {
  user-select: none;
  background: #2451f0;
  width: 76px;
  height: 48px;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}

.account-number {
  display: flex;
  align-items: center;
  gap: 5px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: space-evenly;
  font-size: 9pt;
  font-weight: bold;
  color: #fff;
  background: #0000003d;
}

</style>