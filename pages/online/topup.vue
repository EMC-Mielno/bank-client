<script setup lang="ts">

</script>

<template>
  <h2>How to top up your account at the bank:</h2>

  <div class="topup">
    <p>1. Arrive in the city of Mieleno. You can get to the city from Germany, Poland and Scalia. If you are a resident
      of Poland or the city of Melno, then use /t spawn Mielno.</p>
    <p>2. Find a bank in the city center.</p>
    <p>3. Enter the special booth for topping up your account. In front of you will be a machine for exchanging gold for
      money.</p>
    <p>4. Rename the gold you are going to top up to the nickname used in your bank account.</p>
    <p>5. Place the gold in the funnel of the machine and wait for the account to be topped up.</p>
  </div>

  <h2 class="margin">With illustrations:</h2>
  <div class="topup">
    <p>1. Arrive in the city of Mieleno. You can get to the city from Germany, Poland and Scalia. If you are a resident
      of Poland or the city of Melno, then use /t spawn Mielno.</p>
    <img src="/imgs/topup/map.png" alt="Map">
    <p>2. Find a bank in the city center.</p>
    <img src="/imgs/topup/mielno.png" alt="Mielno">
    <img src="/imgs/topup/bank.jpg" alt="bank">
    <p>3. Enter the special booth for topping up your account. In front of you will be a machine for exchanging gold for
      money.</p>
    <img src="/imgs/topup/booth.jpg" alt="booth">
    <p>4. Rename the gold you are going to top up to the nickname used in your bank account.</p>
    <img src="/imgs/topup/nickname.jpg" alt="nickname">
    <img src="/imgs/topup/renaming.jpg" alt="renaming">
    <p>5. Place the gold in the funnel of the machine and wait for the account to be topped up.</p>
    <img src="/imgs/topup/topup.jpg" alt="topup">
  </div>
</template>

<style scoped lang="scss">
.topup {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.margin {
  margin-top: 25px;
}
</style>