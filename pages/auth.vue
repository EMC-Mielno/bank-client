<script setup lang="ts">

// import { PublicClientApplication } from "@azure/msal-browser";
//
// const msalConfig = {
//   auth: {
//     clientId: 'e432033e-7351-4cdf-9f87-7808e5b383cd',
//     authority: "https://login.microsoftonline.com/consumers",
//     redirectUri: "http://localhost:3000/",
//   }
// };
//
// const msalInstance = await PublicClientApplication.createPublicClientApplication(msalConfig);

definePageMeta({
  layout: 'empty'
})
useHead({
  title: 'Online Bank of Mielno'
})

const runtimeConfig = useRuntimeConfig()
const router = useRouter();
const token = useCookie('token')

let username: Ref<string> = ref('');
let password: Ref<string> = ref('');

function login() {

  // msalInstance.loginPopup({
  //   redirectUri: "http://localhost:3000/blank.html"
  // });
  //
  // return
  const data = {
    nickname: username.value,
    password: password.value
  }

  fetch(`${runtimeConfig.public.apiBase}/auth`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response) => {
    return response.json();
  }).then((data) => {
    // console.log(data)
    if (data['token']) {
      token.value = data['token']
      // router.push('/dashboard')
      window.location.href = '/dashboard';
    }
  }).catch((err) => {
    console.error("Fetch error: ", err);
  })
}

</script>

<template>
  <header>
    <img src="/logo.png" alt="Logo" class="logo">
    <div class="login">
      <h1>
        Hello!<br>
        Signup/Login to Bank of Mielno
      </h1>
      <form v-on:submit.prevent="login">
        <input type="text" placeholder="Username" v-model="username" minlength="3" required>
        <!--        <input type="password" placeholder="Password" v-model="password" minlength="8" required>-->
        <input type="password" placeholder="Password" v-model="password" minlength="4" required>
        <input type="submit" value="Go">
      </form>
    </div>

  </header>
</template>

<style scoped lang="scss">

.login {
  margin: 0 auto;
  width: fit-content;
}

h1 {
  margin-bottom: 32px;
}

</style>