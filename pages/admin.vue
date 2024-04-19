<script setup lang="ts">

definePageMeta({
  layout: 'empty'
})

useHead({
  title: 'Admin panel'
})

const adminToken = useCookie('admin-token')
const token = useCookie('token')
const runtimeConfig = useRuntimeConfig()
const router = useRouter();
const withdraws = ref()

function getAccessToken(pin) {
  fetch(`${runtimeConfig.public.apiBase}/admin/access`, {
    method: 'POST',
    headers: {
      'Authorization': token.value,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "code": pin
    })
  }).then((response) => {
    switch (response.status) {
      case 403:
        adminToken.value = null
        router.push('/')
        break;
      case 401:
        adminToken.value = null
        router.push('/')
        break;
    }
    return response.json();
  }).then((data) => {
    adminToken.value = data.token
  }).catch((err) => {
    console.error("Невозможно отправить запрос", err);
  });
}

if (!adminToken.value) {
  const pin = Number(prompt('Pin code: '))
  getAccessToken(pin)
}


function getWithdraw() {
  fetch(`${runtimeConfig.public.apiBase}/admin/withdraws`, {
    headers: {
      'Authorization': token.value,
      'admin-token': adminToken.value
    }
  }).then((response) => {
    switch (response.status) {
      case 403:
        adminToken.value = null
        router.push('/')
        break;
      case 401:
        adminToken.value = null
        router.push('/')
        break;
    }
    return response.json();
  }).then((data) => {
    withdraws.value = data
  }).catch((err) => {
    console.error("Невозможно отправить запрос", err);
  });
}

const nickname = ref()
const amount = ref()
const topupError = ref(false)
const topupErrorText = ref()
const choosenWithdraw = ref({
  accountsId: null,
  amount: null,
  bankComment: null,
  comment: null,
  id: null,
  nickname: null,
  reason: null,
  status: null
})

function topup() {
  fetch(`${runtimeConfig.public.apiBase}/admin/topup`, {
    method: 'POST',
    headers: {
      'Authorization': token.value,
      'admin-token': adminToken.value,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "nickname": nickname.value,
      "amount": amount.value
    })
  }).then((response) => {
    switch (response.status) {
      case 403:
        adminToken.value = null
        router.push('/')
        break;
      case 401:
        adminToken.value = null
        router.push('/')
        break;
      case 200:
        nickname.value = null
        amount.value = null
        break;
    }
    return response.json();
  }).then((data) => {
    if (data.error) {
      topupErrorText.value = data.error
      topupError.value = true
    }
  }).catch((err) => {
    console.error("Невозможно отправить запрос", err);
  });
}

function changeWithdraw(id, status, comment) {
  fetch(`${runtimeConfig.public.apiBase}/admin/withdraws/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': token.value,
      'admin-token': adminToken.value,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "status": status,
      "comment": comment
    })
  }).then((response) => {
    switch (response.status) {
      case 403:
        adminToken.value = null
        router.push('/')
        break;
      case 401:
        adminToken.value = null
        router.push('/')
        break;
      case 200:
        if (status === 'COMPLETED') {
          choosenWithdraw.value.id = null
        }
        break;
    }
    return response.json();
  }).then((data) => {
    if (data.error) {
      console.log(data)
    }
  }).catch((err) => {
    console.error("Невозможно отправить запрос", err);
  });
}

getWithdraw()

function openRequest(withdraw) {
  console.log(withdraw)

  changeWithdraw(withdraw.id, 'PENDING', 'In processing')

  choosenWithdraw.value = withdraw
}

</script>

<template>
  <div class="page">
    <div class="topup">
      <form class="transfer-form" v-on:submit.prevent="topup">
        <h2>Topup</h2>
        <p class="error" v-if="topupError">{{ topupErrorText }}</p>
        <input type="text" name="nickname" id="nickname" v-model="nickname" placeholder="Pyro" required>
        <input type="number" name="amount" id="amount" v-model="amount" placeholder="0 ₲" required min="1">
        <input type="submit" value="Continue">
      </form>
    </div>
    <div class="withdraw-block">
      <h3>Withdraw requests:</h3>
      <div class="withdraws">
        <div class="withdraw" v-for="withdraw in withdraws" @click="openRequest(withdraw)">
          <section>
            <b>Nickname: {{ withdraw.nickname }}</b>
            <p>Amount: {{ withdraw.amount }}</p>
            <p>Comment: <br>{{ withdraw.comment }}</p>
            <p>Bank comment: <br>{{ withdraw.bankComment }}</p>
          </section>
          <section class="status-block">
            <p class="status"
               v-bind:class="withdraw.status==='OPENED'?'opened':withdraw.status==='COMPLETED'?'completed':
           withdraw.status==='CANCELLED'?'cancelled':withdraw.status==='PENDING'?'pending':''">
              {{ withdraw.status }}</p>
          </section>
        </div>
      </div>
    </div>
    <div class="withdraw-form" v-if="choosenWithdraw.id!==null">
      <h3>Selected request</h3>
      <div class="withdraw">
        <section>
          <p><b>Nickname:</b> {{ choosenWithdraw.nickname }}</p>
          <p><b>Amount:</b> {{ choosenWithdraw.amount }}</p>
          <p><b>Comment:</b> <br>{{ choosenWithdraw.comment }}</p>
          <p><b>Bank comment:</b> <br>{{ choosenWithdraw.bankComment }}</p>
        </section>
        <section class="status-block">
          <p class="status"
             v-bind:class="choosenWithdraw.status==='OPENED'?'opened':choosenWithdraw.status==='COMPLETED'?'completed':
               choosenWithdraw.status==='CANCELLED'?'cancelled':choosenWithdraw.status==='PENDING'?'pending':''">
            {{ choosenWithdraw.status }}</p>
        </section>
      </div>
      <section>
        <button @click="changeWithdraw(choosenWithdraw.id,'COMPLETED','Done')">Completed</button>
        <form v-on:submit.prevent="topup">

        </form>
      </section>
    </div>
  </div>

</template>

<style scoped lang="scss">
.error {
  background: rgba(255, 0, 0, 0.31);
  border: 1px solid red;
  padding: 5px;
  border-radius: 5px;
}

.page {
  display: flex;
  gap: 15px;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-wrap: wrap;
}

.withdraws {
  display: flex;
  flex-direction: column;
  gap: 10px
}

.withdraw {
  border: 1px solid;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: .3s;
  gap: 15px;
}

.withdraw:hover {
  background: rgba(0, 0, 0, 0.11);
}

.status {
  user-select: none;
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 5px;
  padding: 2px;
}

.opened {
  color: #13964f;
  border: 1px solid #13964f;
}

.cancelled {
  color: #8B0000FF;
  border: 1px solid #8B0000FF;
}

.completed, .pending {
  color: #2451f0;
  border: 1px solid #2451f0;
}
</style>