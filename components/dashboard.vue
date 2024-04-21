<script setup lang="ts">
import Transfers from "~/components/transfers.vue";

const nuxtApp = useNuxtApp()
const router = useRouter();
const token = useCookie('token')
const {userData, pending, error} = nuxtApp.$user

let nickname: Ref<string> = ref('');

watchEffect(() => {
  if (!pending.value) {
    try {
      nickname.value = userData.value.nickname
    } catch (e) {
      token.value = undefined
      router.push('/auth')
    }
  }
})
</script>

<template>
  <h1 class="main-name">Hey, {{ nickname }}</h1>
<!--    <p class="main-suggestion">Suggestions for you</p>-->
<!--    <suggestions/>-->
  <h2 class="main-block-header">Transfer</h2>
  <transfers/>
  <h2 class="main-block-header">
    <NuxtLink to="/online/transactions">Recent transactions ></NuxtLink>
  </h2>
  <transaction/>
</template>

<style scoped lang="scss">
h1.main-name, p.main-suggestion {
  margin-bottom: 15px;
}
</style>