<script setup lang="ts">
import Checkmark from "~/components/ui/checkmark.vue";
import ErrorBlock from "~/components/ui/errorBlock.vue";

const token = useCookie('token')
const runtimeConfig = useRuntimeConfig()

const complete = ref(false)
const error = ref(false)
const errorText = ref('')
const name = ref('')

function createAccount() {
  const url = `${runtimeConfig.public.apiBase}/me/account`;
  const data = {
    description: name.value
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
      name.value = ''
    }
  }).catch(error => {
    // Обработка ошибки
    console.error('Error:', error);
  });
}

</script>

<template>
  <checkmark :complete="complete" @toggleComplete="complete = !complete"/>
  <h2 class="main-block-header">Account</h2>
  <div class="description">
    <p>Account for basic operations</p>
    <ul>
      <li>– Save up funds for various purposes</li>
      <li>– Pay for purchases and services</li>
      <li>– Transfer money</li>
    </ul>
  </div>
  <h2 class="main-block-header">Fill in the form</h2>
  <form v-on:submit.prevent="createAccount">
    <label for="name">Account name:</label>
    <input type="text" name="name" id="name" placeholder="Example: for the construction of the stadium" v-model="name"
           required>
    <input type="submit" value="Open an account">
    <errorBlock v-bind:text="errorText" v-if="error"/>
  </form>
</template>

<style scoped lang="scss">
label {
  margin-bottom: 15px;
  display: block;
}

p {
  margin-bottom: 30px;
}

li {
  margin-bottom: 15px;
}

li:last-child {
  margin: 0;
}

</style>