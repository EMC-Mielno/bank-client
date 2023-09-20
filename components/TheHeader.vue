<script setup lang="ts">

</script>

<template>
  <div>
    <header>
      <ul>
        <li>
          <NuxtLink to="/dashboard">main</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/transfer">Transfers</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/transactions">Transactions</NuxtLink>
        </li>
      </ul>
      <ul>
        <li>logout</li>
      </ul>
    </header>
  </div>
</template>

<style scoped lang="scss">
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