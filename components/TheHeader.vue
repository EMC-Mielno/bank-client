<script setup lang="ts">
const router = useRouter();
const token = useCookie('token')

function logout() {
  token.value = undefined
  router.push('/auth')
}

</script>

<template>
  <div>
    <header>
      <ul>
        <li>
          <NuxtLink to="/online/dashboard">main</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/online/transfer-number">Transfers</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/online/transactions">Transactions</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/online/topup">Top up</NuxtLink>
        </li>
      </ul>
      <ul>
        <li class="logout" v-on:click="logout">logout</li>
      </ul>
    </header>
  </div>
</template>

<style scoped lang="scss">
.logout {
  cursor: pointer;
}

.logout:hover {
  color: #363636;
}

header {
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
}

header ul {
  list-style: none;
  display: flex;
}

header li {
  padding: 15px;
  text-transform: uppercase;
  font-weight: bold;
}

header li:nth-child(1) {
  padding-left: 0;
}

a {
  text-decoration: none;
  color: #000000;
}
</style>