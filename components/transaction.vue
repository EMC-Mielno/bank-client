<script setup lang="ts">
const nuxtApp = useNuxtApp()

const {userTransaction, pending, error} = nuxtApp.$transactions

let transactions = ref([])

watchEffect(() => {
  if (!pending.value) {
    transactions = userTransaction.value
  }
})

function formatDate(dateString) {
  const dateParts = dateString.split('.');
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const year = parseInt(dateParts[2]);
  const date = new Date(year, month, day);
  const options = {weekday: 'long', day: 'numeric', month: 'long'};
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
}

</script>

<template>
  <div class="transaction-blocks">
    <div class="transaction-day" v-for="(day, index) in  transactions">
      <h6>{{ formatDate(index) }}</h6>
      <hr>
      <div class="transactions">
        <div class="transaction" v-for="transaction in day">
          <img src="/money-transfer.svg" alt="" class="transaction-logo">
          <article>
            <div class="transaction-info">
              <div class="transaction-info">
                <b>{{ transaction.nickname }}</b>
              </div>
              <span class="money"> <span v-if="transaction.type==='OUT'">-</span> {{ transaction.amount }} ₲</span>
            </div>
            <p>{{ transaction.description }}</p>
          </article>
        </div>
      </div>
    </div>
    <!--    <div class="transaction-day">-->
    <!--      <h6>Sunday, 14 september</h6>-->
    <!--      <hr>-->
    <!--      <div class="transactions">-->
    <!--        <div class="transaction">-->
    <!--          <img src="/money-transfer.svg" alt="" class="transaction-logo">-->
    <!--          <article>-->
    <!--            <div class="transaction-info">-->
    <!--              <div class="transaction-info">-->
    <!--                <b>HarryPotter</b>-->
    <!--              </div>-->
    <!--              <span class="money">-50 ₲</span>-->
    <!--            </div>-->
    <!--            <p>Money transfer</p>-->
    <!--          </article>-->
    <!--        </div>-->
    <!--        <div class="transaction">-->
    <!--          <img src="/money-transfer.svg" alt="" class="transaction-logo">-->
    <!--          <article>-->
    <!--            <div class="transaction-info">-->
    <!--              <b>HarryPotter</b>-->
    <!--              <span class="money">-50 ₲</span>-->
    <!--            </div>-->
    <!--            <p>Money transfer</p>-->
    <!--          </article>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="transaction-day">-->
    <!--      <h6>Sunday, 14 september</h6>-->
    <!--      <hr>-->
    <!--      <div class="transactions">-->
    <!--        <div class="transaction">-->
    <!--          <img src="/money-transfer.svg" alt="" class="transaction-logo">-->
    <!--          <article>-->
    <!--            <div class="transaction-info">-->
    <!--              <div class="transaction-info">-->
    <!--                <b>HarryPotter</b>-->
    <!--              </div>-->
    <!--              <span class="money">-50 ₲</span>-->
    <!--            </div>-->
    <!--            <p>Money transfer</p>-->
    <!--          </article>-->
    <!--        </div>-->
    <!--        <div class="transaction">-->
    <!--          <img src="/money-transfer.svg" alt="" class="transaction-logo">-->
    <!--          <article>-->
    <!--            <div class="transaction-info">-->
    <!--              <b>HarryPotter</b>-->
    <!--              <span class="money">-50 ₲</span>-->
    <!--            </div>-->
    <!--            <p>Money transfer</p>-->
    <!--          </article>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="transaction-day">-->
    <!--      <h6>Sunday, 13 september</h6>-->
    <!--      <hr>-->
    <!--      <div class="transactions">-->
    <!--        <div class="transaction">-->
    <!--          <img src="/money-transfer.svg" alt="" class="transaction-logo">-->
    <!--          <article>-->
    <!--            <div class="transaction-info">-->
    <!--              <b>HarryPotter</b>-->
    <!--              <span class="money">-50 ₲</span>-->
    <!--            </div>-->
    <!--            <p>Money transfer</p>-->
    <!--          </article>-->
    <!--        </div>-->
    <!--        <div class="transaction">-->
    <!--          <img src="/money-transfer.svg" alt="" class="transaction-logo">-->
    <!--          <article>-->
    <!--            <div class="transaction-info">-->
    <!--              <b>HarryPotter</b>-->
    <!--              <span class="money">-50 ₲</span>-->
    <!--            </div>-->
    <!--            <p>Money transfer</p>-->
    <!--          </article>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
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