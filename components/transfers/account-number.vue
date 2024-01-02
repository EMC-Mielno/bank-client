<script setup lang="ts">
import ErrorBlock from "~/components/ui/errorBlock.vue";
import Checkmark from "~/components/ui/checkmark.vue";
import CardOption from "~/components/ui/cardOption.vue";
import CardInput from "~/components/ui/cardInput.vue";

const nuxtApp = useNuxtApp()
const token = useCookie('token')
const runtimeConfig = useRuntimeConfig()
const {userData, pending, refresh} = nuxtApp.$user

const formData = ref({
  sender_account: -1,
  receiver_account: null,
  amount: null
})

const complete = ref(false)
const error = ref(false)
const errorText = ref('No errors')

function transfer() {
  const url = `${runtimeConfig.public.apiBase}/me/account-transfer`;
  const data = {
    to: formData.value.receiver_account,
    from: formData.value.sender_account,
    amount: formData.value.amount
  };
  error.value = false
  errorText.value = ''
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token.value
    },
    body: JSON.stringify(data)
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
      formData.value = {
        sender_account: -1,
        receiver_account: null,
        amount: null
      }
      refresh()
    }
  }).catch(error => {
    // Обработка ошибки
    console.error('Error:', error);
  });
}

const preAmount = ref()

function handleSenderCardChange(account) {
  formData.value.sender_account = account.account_number
  preAmount.value = account.balance
}

function handleReceiverCardChange(account_id) {
  formData.value.receiver_account = account_id
}

function allFunds() {
  formData.value.amount = preAmount.value
}
</script>

<template>
  <div>
    <checkmark :complete="complete" @toggleComplete="complete = !complete"/>
    <form class="transfer-form" v-on:submit.prevent="transfer">
      <h2>Transfer by account number</h2>
      <errorBlock v-bind:text="errorText" :invisible="!error"/>
      <card-option @choosedCard="handleSenderCardChange" v-if="!pending" :accounts="userData.accounts" :key="formData"/>
      <card-input @choosedCard="handleReceiverCardChange" :key="formData"/>
      <input type="number" name="amount" id="" v-model="formData.amount" placeholder="0 ₲" min="1">
      <div class="all-funds" v-if="preAmount>0" @click="allFunds">All {{ preAmount }} ₲</div>
      <input type="submit" value="Continue">
    </form>
  </div>
</template>

<style scoped lang="scss">
input {
  margin: 0;
}
</style>