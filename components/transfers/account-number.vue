<script setup lang="ts">
const nuxtApp = useNuxtApp()
const token = useCookie('token')
const runtimeConfig = useRuntimeConfig()
const {userData, refresh} = nuxtApp.$user

const formData = ref({
  sender_account: -1,
  receiver_account: null,
  amount: null
})

const complete = ref(false)
const error = ref(false)
const errorText = ref('')

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
      refresh()
      complete.value = true;
      error.value = false
      errorText.value = ''
      formData.value = {
        sender_account: -1,
        receiver_account: null,
        amount: null
      }
    }
  }).catch(error => {
    // Обработка ошибки
    console.error('Error:', error);
  });
}
</script>

<template>
  <div>
    <checkmark :complete="complete" @toggleComplete="complete = !complete"/>
    <form class="transfer-form" v-on:submit.prevent="transfer">
      <h2 class="main-block-header">Transfer by account number</h2>
      <label for="account_id">Your account:</label>
      <select name="account_id" v-model="formData.sender_account" required>
        <option value="-1" selected disabled>--Please choose an account--</option>
        <option v-for="account in userData.accounts" v-bind:value="account.account_number">
          {{ account.name }} ({{ account.account_number}})
        </option>
      </select>
      <label for="account_id">Recipient's account number:</label>
      <input type="number" name="recipient_id" id="" v-model="formData.receiver_account"
             placeholder="Recipient's account number" required>
      <label for="account_id">Amount:</label>
      <input type="number" name="amount" id="" v-model="formData.amount" placeholder="0 ₲" min="1">
      <input type="submit" value="Continue">
      <errorBlock v-bind:text="errorText" v-if="error"/>
    </form>
  </div>
</template>

<style scoped lang="scss">

</style>