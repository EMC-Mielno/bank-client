<script setup lang="ts">
import Checkmark from "~/components/ui/checkmark.vue";
import ErrorBlock from "~/components/ui/errorBlock.vue";

const nuxtApp = useNuxtApp()
const token = useCookie('token')
const runtimeConfig = useRuntimeConfig()
const {userData,refresh} = nuxtApp.$user

const formData = ref({
  sender_account: -1,
  nickname: null,
  amount: null
})

const complete = ref(false)
const error = ref(false)
const errorText = ref('')

function transfer() {
  const url = `${runtimeConfig.public.apiBase}/me/nickname-transfer`;
  const data = {
    nickname: formData.value.nickname,
    account_number: formData.value.sender_account,
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
        nickname: null,
        amount: null
      }
      refresh()
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
      <h2 class="main-block-header">Transfer by nickname</h2>
      <label for="account_id">Your account:</label>
      <select name="account_id" v-model="formData.sender_account" required>
        <option value="-1" selected disabled>--Please choose an account--</option>
        <option v-for="account in userData.accounts" v-bind:value="account.account_number">
          {{ account.name }}
        </option>
      </select>
      <label for="nickname">Recipient's nickname:</label>
      <input type="text" name="nickname" id="nickname" v-model="formData.nickname" placeholder="Recipient's nickname">
      <label for="account_id">Amount:</label>
      <input type="number" name="amount" id="amount" v-model="formData.amount" placeholder="0 ₲" required min="1">
      <input type="submit" value="Continue">
      <errorBlock v-bind:text="errorText" v-if="error"/>
    </form>
  </div>
</template>

<style scoped lang="scss">
h1 {

}
</style>