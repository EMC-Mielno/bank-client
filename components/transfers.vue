<script setup lang="ts">
</script>

<template>
  <div class="transfer-buttons">
    <NuxtLink to="/online/transfer-between" class="transfer-button">
      <img src="/between-transfer.svg" alt="" class="transfer-button-icon">
      <p class="transfer-button-name">Between your accounts</p>
    </NuxtLink>
    <NuxtLink to="/online/transfer-number" class="transfer-button">
      <img src="/account-transfer.svg" alt="" class="transfer-button-icon">
      <p class="transfer-button-name">By account number</p>
    </NuxtLink>
    <NuxtLink to="/online/transfer-nickname" class="transfer-button">
      <img src="/nickname-transfer.svg" alt="" class="transfer-button-icon">
      <p class="transfer-button-name">By nickname</p>
    </NuxtLink>
    <NuxtLink to="/online/transfer-withdraw" class="transfer-button">
      <img src="/withdraw-icon.svg" alt="" class="transfer-button-icon">
      <p class="transfer-button-name">Withdraw</p>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.transfer-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.transfer-button {
  text-align: center;
  cursor: pointer;
  width: 150px;
}

.transfer-button:hover img.transfer-button-icon {
  background: #3f3f3f;
}

img.transfer-button-icon {
  background: #121212;
  padding: 8px;
  border-radius: 9px;
  width: 32px;
  height: 32px;
}

img[src="/between-transfer.svg"] {
  filter: invert(1);
}
</style>