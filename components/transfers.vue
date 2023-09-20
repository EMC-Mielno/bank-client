<script setup lang="ts">

</script>

<template>
  <div class="transfer-buttons">
    <div class="transfer-button">
      <img src="/account-transfer.svg" alt="" class="transfer-button-icon">
      <p class="transfer-button-name">
        <NuxtLink to="/transfer/account-number">By account number</NuxtLink>
      </p>
    </div>
    <div class="transfer-button">
      <img src="/nickname-transfer.svg" alt="" class="transfer-button-icon">
      <p class="transfer-button-name">
          <NuxtLink to="/transfer/nickname">By nickname</NuxtLink>
      </p>
    </div>
    <div class="transfer-button">
      <img src="/withdraw-icon.svg" alt="" class="transfer-button-icon">
      <p class="transfer-button-name">
          <NuxtLink to="/transfer/nickname">Withdraw request</NuxtLink>
      </p>
    </div>
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
</style>