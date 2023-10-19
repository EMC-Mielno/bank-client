<script setup lang="ts">
import TheHeader from "~/components/TheHeader.vue";

const runtimeConfig = useRuntimeConfig()
const token = useCookie('token')
const nuxtApp = useNuxtApp()

function getUserData() {
  const {
    data: userData,
    pending,
    error,
    refresh
  } = useFetch(`${runtimeConfig.public.apiBase}/user`, {
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
  } = useFetch(`${runtimeConfig.public.apiBase}/transactions?limit=1000`, {
        onRequest({request, options}) {
          options.headers = options.headers || {}
          options.headers.authorization = token.value
        }
      }
  )

  nuxtApp.provide('transactions', {userTransaction: userTransaction, pending: pending, error: error, refresh: refresh})
}

getUserData()
getUserTransaction()

</script>

<template>
  <div id="main-app">
    <TheAside/>
    <div class="main-content">
      <TheHeader/>
      <NuxtPage/>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/scss/global.scss' as *;

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