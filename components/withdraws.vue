<script setup lang="ts">
import Checkmark from "~/components/ui/checkmark.vue";
import ErrorBlock from "~/components/ui/errorBlock.vue";

const nuxtApp = useNuxtApp()
const token = useCookie('token')
const runtimeConfig = useRuntimeConfig()

const {refresh: userRefresh} = nuxtApp.$user
const {userWithdraws, refresh} = nuxtApp.$withdraws
const {refresh: transactionsRefresh} = nuxtApp.$transactions

const complete = ref(false)
const error = ref(false)
const errorText = ref('')

function cancel(id) {
  const url = `${runtimeConfig.public.apiBase}/me/withdraw/${id}`;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token.value
    }
  }).then(response => {
    return response.json();
  }).then(data => {
    if (data.error) {
      error.value = true
      errorText.value = data.error
    } else {
      complete.value = true;
      error.value = false
      errorText.value = ''
      refresh()
      userRefresh()
      transactionsRefresh()
    }
  }).catch(error => {
    // Обработка ошибки
    console.error('Error:', error);
  });
}
</script>

<template>
  <div class="withdraw-blocks">
    <checkmark :complete="complete" @toggleComplete="complete = !complete"/>
    <h2>Your requests</h2>
    <errorBlock v-bind:text="errorText" v-if="error"/>
    <div class="withdraws" v-for="withdraw in userWithdraws">
      <section>
        <b>Nickname: {{ withdraw.nickname }}</b>
        <p>Amount: {{ withdraw.amount }}</p>
        <p>Comment: <br>{{ withdraw.comment }}</p>
        <p>Bank comment: <br>{{ withdraw.bankComment }}</p>
      </section>
      <section class="status-block">
        <p class="status"
           v-bind:class="withdraw.status==='OPENED'?'opened':withdraw.status==='COMPLETED'?'completed':
           withdraw.status==='CANCELLED'?'cancelled':withdraw.status==='PENDING'?'pending':''">
          {{ withdraw.status }}</p>
        <button v-if="withdraw.status==='OPENED'" v-on:click="cancel(withdraw.id)">Cancel</button>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
h2 {
  margin: 15px 0;
}

.withdraw-blocks {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.withdraws {
  border: 1px solid;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
}

.status {
  user-select: none;
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 5px;
  padding: 2px;
}

.opened {
  color: #13964f;
  border: 1px solid #13964f;
}

.cancelled {
  color: #8B0000FF;
  border: 1px solid #8B0000FF;
}

.completed, .pending {
  color: #2451f0;
  border: 1px solid #2451f0;
}

.status-block {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
}

button {
  width: 100%;
  height: 35px;
  background: #fff;
  border: 1px solid darkred;
  color: darkred;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: rgba(0, 0, 0, 0.12);
}
</style>