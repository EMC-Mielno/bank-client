<script setup lang="ts">
import Copy from "~/components/ui/copy.vue";
import CardMini from "~/components/ui/cardMini.vue";

const nuxtApp = useNuxtApp()
const router = useRouter()

const {userData, pending, error} = nuxtApp.$user

function openAccount(account_id) {
  router.push(`/online/accounts/${account_id}`)
}

</script>

<template>
  <div v-if="pending">
    Loading
  </div>
  <div :key='userData' v-else>
    <aside>
      <NuxtLink to="/online/dashboard">
        <img src="/logo.png" alt="Logo" class="logo">
      </NuxtLink>
      <div class="aside-wallet">
        <h2>Wallet</h2>
        <div class="aside-accounts">
          <div class="aside-account" v-for="account in userData.accounts"
               v-on:click.self="openAccount(account.account_id)">
            <card-mini :copy="true" :number="account.account_number"/>
            <section class="card-info" v-on:click="openAccount(account.account_id)">
              <p>{{ account.name }}</p>
              <p>{{ account.balance }} ₲</p>
            </section>
          </div>
        </div>
        <div class="new-product-button">
          <NuxtLink to="/online/new">
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
  //padding: 25px;
  border-radius: 15px;
}

h2 {
  margin: 25px;
}

.aside-wallet > *, .aside-account {
  margin-bottom: 10px;
}

.new-product-button {
  margin: 25px;
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

.aside-account {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 25px;
  cursor: pointer;
  transition: 0.2s;
}

.aside-account:hover {
  background: #ddd;
}

</style>