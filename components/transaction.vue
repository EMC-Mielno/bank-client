<script setup lang="ts">

</script>

<template>
  <div class="transaction-blocks">
    <div class="transaction-day">
      <h6>Sunday, 14 september</h6>
      <hr>
      <div class="transactions">
        <div class="transaction">
          <img src="/money-transfer.svg" alt="" class="transaction-logo">
          <article>
            <div class="transaction-info">
              <div class="transaction-info">
                <b>HarryPotter</b>
              </div>
              <span class="money">-50 ₲</span>
            </div>
            <p>Money transfer</p>
          </article>
        </div>
        <div class="transaction">
          <img src="/money-transfer.svg" alt="" class="transaction-logo">
          <article>
            <div class="transaction-info">
              <b>HarryPotter</b>
              <span class="money">-50 ₲</span>
            </div>
            <p>Money transfer</p>
          </article>
        </div>
      </div>
    </div>
    <div class="transaction-day">
      <h6>Sunday, 13 september</h6>
      <hr>
      <div class="transactions">
        <div class="transaction">
          <img src="/money-transfer.svg" alt="" class="transaction-logo">
          <article>
            <div class="transaction-info">
              <b>HarryPotter</b>
              <span class="money">-50 ₲</span>
            </div>
            <p>Money transfer</p>
          </article>
        </div>
        <div class="transaction">
          <img src="/money-transfer.svg" alt="" class="transaction-logo">
          <article>
            <div class="transaction-info">
              <b>HarryPotter</b>
              <span class="money">-50 ₲</span>
            </div>
            <p>Money transfer</p>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.transaction {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.transaction-info {
  display: flex;
  justify-content: space-between;
}

.transaction article {
  width: 100%;
}

img.transaction-logo {
  width: 32px;
  height: 32px;
  background: #F0F1F3;
  border: 1px solid #a7a7a7;
  padding: 8px;
  border-radius: 9px;
}
</style>