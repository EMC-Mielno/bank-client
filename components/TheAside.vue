<script setup lang="ts">
const nuxtApp = useNuxtApp()

const {userData, pending, error} = nuxtApp.$user
const router = useRouter();
const token = useCookie('token')

interface account {
  account_id: string;
  balance: string;
  total_income: string;
  total_outcome: string;
  type: number;
}

let mainAccount: Ref<account[]> = ref([]);
let additionalAccount: Ref<account[]> = ref([]);
let businessAccount: Ref<account[]> = ref([]);

watchEffect(() => {
  if (!pending.value) {
    try {
      mainAccount = userData.value.accounts.filter((obj) => obj.type == 1)[0]
      additionalAccount = userData.value.accounts.filter((obj) => obj.type == 2)
      businessAccount = userData.value.accounts.filter((obj) => obj.type == 3)[0]
    } catch (e) {
      token.value = undefined
      router.push('/auth')
    }
  }
})
</script>

<template>
  <div>
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
          </div>
          <div class="aside-account" v-for="account in additionalAccount">
            <h2>{{ account.balance }} ₲</h2>
            <p>{{ account.name }}</p>
          </div>
          <div class="aside-account">
            <h2>{{ businessAccount.balance }} ₲</h2>
            <p>Total on your business account</p>
          </div>
        </div>
        <div class="month-stat">
          <h3>Spent this month</h3>
          <p>0 ₲</p>
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