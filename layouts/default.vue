<script setup lang="ts">
import TheHeader from "~/components/TheHeader.vue";

const runtimeConfig = useRuntimeConfig()
const token = useCookie('token')
const nuxtApp = useNuxtApp()
const router = useRouter()

if (!token.value) {
  router.push(`/auth`)
}

useHead({
  title: 'Mielno Bank'
})

function getUserData() {
  const {
    data: userData,
    pending,
    error,
    refresh
  } = useFetch(`${runtimeConfig.public.apiBase}/me`, {
        onRequest({request, options}) {
          options.headers = options.headers || {}
          options.headers.authorization = token.value
        }
      }
  )

  nuxtApp.provide('user', {userData: userData, pending: pending, error: error, refresh: refresh})
}

function getUserTransaction() {
  const {
    data: userTransaction,
    pending,
    error,
    refresh
  } = useFetch(`${runtimeConfig.public.apiBase}/me/history`, {
        onRequest({request, options}) {
          options.headers = options.headers || {}
          options.headers.authorization = token.value
        }
      }
  )

  nuxtApp.provide('transactions', {userTransaction: userTransaction, pending: pending, error: error, refresh: refresh})
}

function getUserWithdraws() {
  const {
    data: userWithdraws,
    pending,
    error,
    refresh
  } = useFetch(`${runtimeConfig.public.apiBase}/me/withdraw`, {
        onRequest({request, options}) {
          options.headers = options.headers || {}
          options.headers.authorization = token.value
        }
      }
  )

  nuxtApp.provide('withdraws', {userWithdraws: userWithdraws, pending: pending, error: error, refresh: refresh})
}

function checkToken() {
  fetch(`${runtimeConfig.public.apiBase}/me/`, {
    headers: {
      'Authorization': token.value
    }
  }).then((response) => {
    switch (response.status) {
      case 403:
        token.value = null
        router.push('/')
        break;
      case 401:
        token.value = null
        router.push('/')
        break;
      case 200:
        break;
    }
    return response.json();
  }).then((data) => {
  }).catch((err) => {
    console.error("Невозможно отправить запрос", err);
  });
}

checkToken()

getUserData()
getUserTransaction()
getUserWithdraws()

</script>

<template>
  <div id="main-app">
    <TheAside/>
    <div class="main-content">
      <TheHeader/>
      <NuxtPage/>
      <TheFooter/>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/scss/global.scss' as *;

.default-page{
  margin-bottom: 25px;
}

#main-app {
  display: flex;
  width: 1080px;
  gap: 25px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.main-content {
  width: 100%;
  overflow: auto;
}

/*  scrollbar Chrome, Safari и Opera */
.main-content::-webkit-scrollbar {
  display: none;
}

/* scrollbar IE, Edge и Firefox */
.main-content {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>