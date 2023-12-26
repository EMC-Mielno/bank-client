<script setup lang="ts">
const nuxtApp = useNuxtApp()

const {userData, pending, error} = nuxtApp.$user

interface account {
  account_id: number;
  type: string;
  name: string;
  total_income: number;
  total_outcome: number;
  balance: number;
  account_number: string;
}

let mainAccount: Ref<account> = ref({
  "account_id": 0,
  "type": "",
  "name": "",
  "total_income": 0,
  "total_outcome": 0,
  "balance": 0,
  "account_number": ""
});
let additionalAccount: Ref<account[]> = ref([]);
// let businessAccount: Ref<account> = ref({
//   "account_id": 0,
//   "type": "",
//   "name": "",
//   "total_income": 0,
//   "total_outcome": 0,
//   "balance": 0,
//   "account_number": ""
// });

watchEffect(() => {
  if (!pending.value) {
    try {
      mainAccount = userData.value.accounts.filter((obj) => obj.type === 'MAIN')[0]
      additionalAccount = userData.value.accounts.filter((obj) => obj.type === 'ADDITIONAL')
      // businessAccount = userData.value.accounts.filter((obj) => obj.type === 'BUSINESS')[0]
    } catch (e) {
      console.error(e)
    }
  }
})
</script>

<template>
  <div :key='userData'>
    <aside>
      <NuxtLink to="/dashboard">
        <img src="/logo.png" alt="Logo" class="logo">
      </NuxtLink>
      <div class="aside-wallet">
        <h2>Wallet</h2>
        <div class="aside-accounts">
          <div class="aside-account">
            <h2>{{ mainAccount.balance }} ₲</h2>
            <p>Total on your main account</p>
            <p>{{mainAccount.account_number}}</p>
          </div>
          <div class="aside-account" v-for="account in additionalAccount">
            <h2>{{ account.balance }} ₲</h2>
            <p>{{ account.name }}</p>
            <p>{{ account.account_number }}</p>
          </div>
          <!--          <div class="aside-account">-->
          <!--            <h2>{{ businessAccount.balance }} ₲</h2>-->
          <!--            <p>Total on your business account</p>-->
          <!--          </div>-->
        </div>
        <div class="new-product-button">
          <NuxtLink to="/new">
            <button>+</button>
          </NuxtLink>
          <article>
            <h4>New product</h4>
            <p>Account, business acc...</p>
          </article>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped lang="scss">
aside {
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.aside-wallet {
  background: #F0F1F3;
  padding: 25px;
  border-radius: 15px;
}

.aside-wallet > *, .aside-account {
  margin-bottom: 25px;
}

.new-product-button {
  display: flex;
  align-items: center;
}

.new-product-button button {
  width: 76px;
  height: 48px;
  margin-right: 10px;
  background: #ffffff;
  border: 1px solid #d7d7d7;
  border-radius: 4px;
  transition: 0.2s;
}

.new-product-button button:hover {
  cursor: pointer;
  transform: scale(1.05);
}
</style>