<script setup lang="ts">
import Transfers from "~/components/transfers.vue";
import AccountNumber from "~/components/transfers/account-number.vue";
import Nickname from "~/components/transfers/nickname.vue";
import Withdraw from "~/components/transfers/withdraw.vue";
import Between from "~/components/transfers/between.vue";

const route = useRoute()
// console.log(route.params.type)
const tab = ref(route.params.type)
</script>

<template>
  <div>
    <h2 class="main-block-header">Transfer</h2>
    <transfers/>
    <account-number v-if="tab=='number'"/>
    <withdraw v-else-if="tab=='withdraw'"/>
    <nickname v-else-if="tab =='nickname'"/>
    <between v-else-if="tab =='between'"/>
  </div>
</template>

<style scoped lang="scss">
h1 {

}
</style>