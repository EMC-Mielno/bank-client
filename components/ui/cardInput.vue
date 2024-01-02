<script setup lang="ts">

const emit = defineEmits(['choosedCard'])

const account_id = ref()

function choose() {
  emit('choosedCard', account_id);
}

</script>

<template>
  <div class="cardOption">
    <div class="drop-card">
      <div class="card-icon">
        <div class="account-number">
          <div class="text"></div>
        </div>
      </div>
      <input type="number" placeholder="Recipient's account number" @change="choose" v-model="account_id">
    </div>
  </div>
</template>

<style scoped lang="scss">
.drop-card {
  display: flex;
  padding: 15px;
  background: #e6e8ea;
  border-radius: 5px;
}

.text {
  width: 60%;
  height: 7px;
  background: #a6baff;
  border-radius: 2px;
}

.cardOption {
  width: 100%;
  margin: 0 auto;
  position: relative;
}

input {
  width: 83%;
}

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
  position: absolute;
  height: 15px;
  bottom: 0;
  left: 0;
  right: 0;
  background: #0000003d;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>