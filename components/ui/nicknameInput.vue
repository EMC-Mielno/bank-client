<script setup lang="ts">

const emit = defineEmits(['nickname'])

const nickname = ref('')

function choose() {
  emit('nickname', nickname);
}

</script>

<template>
  <div class="cardOption">
    <div class="drop-card">
      <input type="text" placeholder="Recipient's nickname" @change="choose" v-model="nickname">
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
img{
  width: 100%;
  height: 100%;
}
.text {
  width: 60%;
  height: 7px;
  background: #0f205d;
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
  width: 76px;
  height: 48px;
  overflow: hidden;
  border-radius: 5px;
}

</style>