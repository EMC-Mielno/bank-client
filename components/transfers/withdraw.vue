<script setup lang="ts">
import Hint from "~/components/ui/hint.vue";
import ErrorBlock from "~/components/ui/errorBlock.vue";
import Checkmark from "~/components/ui/checkmark.vue";
import CardOption from "~/components/ui/cardOption.vue";
import NicknameInput from "~/components/ui/nicknameInput.vue";

const nuxtApp = useNuxtApp()
const token = useCookie('token')
const runtimeConfig = useRuntimeConfig()
const {userData, pending: userPending, refresh: userRefresh} = nuxtApp.$user
const {userWithdraws, pending: withdrawsPending, refresh: withdrawRefresh} = nuxtApp.$withdraws

const formData = ref({
  account_id: -1,
  nickname: null,
  amount: null,
  comment: null
})

const complete = ref(false)
const error = ref(false)
const errorText = ref('No errors')

function transfer() {
  const url = `${runtimeConfig.public.apiBase}/me/withdraw`;
  const data = {
    account_id: formData.value.account_id,
    nickname: formData.value.nickname,
    amount: formData.value.amount,
    comment: formData.value.comment
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
        account_id: -1,
        nickname: null,
        amount: null,
        comment: null
      }
      userRefresh()
      withdrawRefresh()
    }
  }).catch(error => {
    // Обработка ошибки
    console.error('Error:', error);
  });
}

function handleSenderCardChange(account) {
  formData.value.account_id = account.account_id
}

function handleNicknameChange(nickname) {
  formData.value.nickname = nickname
}

</script>

<template>
  <p v-if="userPending && withdrawsPending">Loading...</p>
  <div v-else>
    <checkmark :complete="complete" @toggleComplete="complete = !complete"/>
    <form class="transfer-form" v-on:submit.prevent="transfer">
      <h2>Withdraw</h2>
      <errorBlock v-bind:text="errorText" :invisible="!error"/>
      <card-option @choosedCard="handleSenderCardChange" :accounts="userData.accounts"
                   :key="formData"/>
      <label for="account_id">Recipient's in-game nickname:
        <hint>Do not change your in-game nickname until you receive the funds. If you want to transfer money to another
          player, it is better to use a transfer
        </hint>
      </label>
      <nickname-input @nickname="handleNicknameChange"/>
      <input type="number" name="amount" id="amount" placeholder="0 ₲" v-model="formData.amount" required>
      <label for="account_id">Comment:
        <hint>Describe where you can be found and what time you are playing (also specify the time zone)</hint>
      </label>
      <input type="text" name="comment" id="comment" placeholder="" v-model="formData.comment">
      <input type="submit" value="Continue">
    </form>
    <withdraws class="transfer-form"/>
  </div>
</template>

<style scoped lang="scss">

</style>