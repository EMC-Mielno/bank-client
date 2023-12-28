<script setup lang="ts">
import {toRaw} from 'vue'
import Checkmark from "~/components/ui/checkmark.vue";
import ErrorBlock from "~/components/ui/errorBlock.vue";

const route = useRoute()
const token = useCookie('token')
const runtimeConfig = useRuntimeConfig()
const page_id = ref(route.params.id)
let id = parseInt(page_id.value)
const nuxtApp = useNuxtApp()
const {userData, pending, refresh} = nuxtApp.$user

const error = ref(false)
const errorText = ref('')

function getAccountById(accounts, id) {
  return accounts.find(account => account.account_id === id);
}

function formatNumber(number) {
  let strNumber = number.toString();
  let formattedNumber = '··' + strNumber.slice(-4);
  return formattedNumber;
}

let account = ref()
let account_name = ref('')
watchEffect(() => {
  if (!pending.value) {
    account.value = getAccountById(toRaw(userData.value.accounts), id)
  }
})

const edit = ref(false)

function changeName() {
  const url = `${runtimeConfig.public.apiBase}/me/account`;
  const data = {
    account_id: id,
    name: account_name.value
  };
  error.value = false
  errorText.value = ''
  fetch(url, {
    method: 'PUT',
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
      error.value = false
      errorText.value = ''
      edit.value = false
      refresh()
    }
  }).catch(error => {
    // Обработка ошибки
    console.error('Error:', error);
  });
}

</script>

<template>
  <div class="account-block">
    <div class="back">
      <NuxtLink to="/"><span>⬅</span> Back</NuxtLink>
    </div>
    <div class="name">
      <p>Current account {{ formatNumber(account.account_number) }}</p>
      <div v-if="!edit" class="text-name">
        <h2>{{ account.name }}</h2>
        <img v-if="account.type !== 'MAIN'" src="/icons/pen-solid.svg" v-on:click="edit = !edit" alt="">
      </div>
      <div v-else class="edit-block">
        <input type="text" v-model="account_name" v-bind:placeholder="account.name">
        <img src="/icons/check-solid.svg" v-on:click="changeName()" alt="">
        <img src="/icons/xmark-solid.svg" v-on:click="edit = !edit" alt="">
      </div>
    </div>
    <div class="available">
      <p>Available</p>
      <h1>{{ account.balance }} ₲</h1>
    </div>
    <errorBlock v-bind:text="errorText" v-if="error"/>
  </div>
</template>

<style scoped lang="scss">
.account-block {
  display: flex;
  flex-direction: column;
  gap: 25px;
  background: #d9e1ea;
  padding: 25px;
  border-radius: 15px;
}

input {
  margin: 0;
  background: #ffffff;
}

.text-name, .edit-block {
  display: flex;
  gap: 15px;
  align-items: center;
  height: 60px;
}

img {
  width: 22px;
  cursor: pointer;
}
</style>