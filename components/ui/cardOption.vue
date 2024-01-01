<script setup lang="ts">

import CardMini from "~/components/ui/cardMini.vue";

const props = defineProps(['accounts'])
const accounts = props.accounts

const opened = ref(false)

const choosen = ref(accounts.find(item => item.type === 'MAIN'))

function choose(account_id) {
  choosen.value = accounts.find(item => item.account_id === account_id)
  opened.value = false
  handleChange(account_id)
}


</script>

<template>
  <div class="cardOption">
    <div class="drop-card" @click="opened = !opened" :class="opened?'opened':''">
      <div class="card-info">
        <card-mini :number="choosen.account_number" :key="choosen"/>
        <div class="amount">
          <p>{{ choosen.name }}</p>
          <b> {{ choosen.balance }} ₲</b>
        </div>
      </div>
      <span class="arrow">^|</span>
    </div>
    <div class="dropped" v-if="opened">
      <div class="card-info" v-for="account in accounts" @click="choose(account.account_id)">
        <card-mini :number="account.account_number"/>
        <div class="amount">
          <p>{{ account.name }}</p>
          <b> {{ account.balance }} ₲</b>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.arrow {
  user-select: none;
  transition: .2s;
}

.opened .arrow {
  rotate: 180deg;
}

.cardOption {
  width: 90%;
  margin: 0 auto;
  position: relative;
}

.drop-card {
  background: #E6E8EA;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 5px;
  border: 3px solid rgba(255, 255, 255, 0);
}

.opened {
  border: 3px solid #a7a7a7;
}

.card-info {
  display: flex;
  gap: 15px;
}

.amount {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  user-select: none;
}

.dropped {
  background: #E6E8EA;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 8px 0 #a9a9a9;
  position: absolute;
  right: 0;
  left: 0;
  margin-top: 5px;
}

.dropped > .card-info {
  padding: 15px;
  transition: .2s;
}

.dropped > .card-info:hover {
  background: #ffffff;
  box-shadow: 0 0 8px 0 #a9a9a9;
}
</style>