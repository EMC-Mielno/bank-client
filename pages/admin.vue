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
const errorStatus = ref(false)
const errorText = ref()
const successStatus = ref(false)
const successText = ref()
const comment = ref('')
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

function getWithdraw(id) {
  fetch(`${runtimeConfig.public.apiBase}/admin/withdraws/${id}`, {
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
    if (data.error) {
      errorStatus.value = true
      errorText.value = data.error
    } else {
      choosenWithdraw.value = data
    }
  }).catch((err) => {
    console.error("Невозможно отправить запрос", err);
  });
}

function getWithdraws() {
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
  errorStatus.value = false
  errorText.value = ''
  successStatus.value = true
  successText.value = ''
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
          choosenWithdraw.value = {
            accountsId: null,
            amount: null,
            bankComment: null,
            comment: null,
            id: null,
            nickname: null,
            reason: null,
            status: null
          }
          choosenOpen.value = false
        }
        if (status === 'CANCELLED') {
          choosenWithdraw.value = {
            accountsId: null,
            amount: null,
            bankComment: null,
            comment: null,
            id: null,
            nickname: null,
            reason: null,
            status: null
          }
          choosenOpen.value = false
        }
        getWithdraw(id)
        getWithdraws()
        break;
    }
    return response.json();
  }).then((data) => {
    if (data.error) {
      errorStatus.value = true
      errorText.value = data.error
    } else {
      successStatus.value = true
      successText.value = data.status
    }
  }).catch((err) => {
    console.error("Невозможно отправить запрос", err);
  });
}

getWithdraws()

function openRequest(withdraw) {
  choosenOpen.value = true
  if (withdraw.status !== 'PENDING') {
    changeWithdraw(withdraw.id, 'PENDING', 'In processing')
  } else getWithdraw(withdraw.id)
}

function cancelRequest() {
  changeWithdraw(choosenWithdraw.value.id, 'CANCELLED', comment.value)
}

function confirmRequest() {
  changeWithdraw(choosenWithdraw.value.id, 'COMPLETED', 'Done')
}

function backRequest() {
  if (comment.value.trim().length < 3) {
    changeWithdraw(choosenWithdraw.value.id, 'OPENED', 'Unsuccessful money withdrawal, expect a second attempt')
  } else changeWithdraw(choosenWithdraw.value.id, 'OPENED', comment.value)
}

const choosenOpen = ref(false)
const isButtonPressed = ref(false)

async function copyText(text) {
  await navigator.clipboard.writeText(text);
}

let timerId

function startTimer() {
  isButtonPressed.value = true;
  timerId = setTimeout(() => {
    isButtonPressed.value = false;
    cancelRequest()
  }, 1000);
}

function endTimer() {
  isButtonPressed.value = false;
  clearTimeout(timerId);
}

const confirmIsButtonPressed = ref(false)

let confirmTimerId

function confirmStartTimer() {
  confirmIsButtonPressed.value = true;
  confirmTimerId = setTimeout(() => {
    isButtonPressed.value = false;
    confirmRequest()
  }, 1000);
}

function confirmEndTimer() {
  confirmIsButtonPressed.value = false;
  clearTimeout(confirmTimerId);
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
    <div class="withdraw-block" v-if="!choosenOpen">
      <h3 class="refresh" @click="getWithdraws">Withdraw requests: (🔃)</h3>
      <div class="withdraws">
        <table>
          <thead>
          <tr>
            <th scope="col">Nickname</th>
            <th scope="col">Amount</th>
            <th scope="col">User comment</th>
            <th scope="col">Bank comment</th>
            <th scope="col">Status</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="withdraw in withdraws">
            <th scope="row">{{ withdraw.nickname }}</th>
            <td>{{ withdraw.amount }}</td>
            <td>{{ withdraw.comment }}</td>
            <td>{{ withdraw.bankComment }}</td>
            <td>
              <section class="status-block">
                <p class="status"
                   v-bind:class="withdraw.status==='OPENED'?'opened':withdraw.status==='COMPLETED'?'completed':
                         withdraw.status==='CANCELLED'?'cancelled':withdraw.status==='PENDING'?'pending':''">
                  {{ withdraw.status }}</p>
              </section>
            </td>
            <td>
              <button @click="openRequest(withdraw)">Took a request</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="withdraw-form" v-if="choosenOpen">
      <h3>Current request: </h3>
      <table>
        <thead>
        <tr>
          <th scope="col">Nickname</th>
          <th scope="col">Amount</th>
          <th scope="col">User comment</th>
          <th scope="col">Bank comment</th>
          <th scope="col">Status</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">{{ choosenWithdraw.nickname }}</th>
          <td>{{ choosenWithdraw.amount }}</td>
          <td>{{ choosenWithdraw.comment }}</td>
          <td>{{ choosenWithdraw.bankComment }}</td>
          <td>
            <section class="status-block">
              <p class="status"
                 v-bind:class="choosenWithdraw.status==='OPENED'?'opened':choosenWithdraw.status==='COMPLETED'?'completed':
                         choosenWithdraw.status==='CANCELLED'?'cancelled':choosenWithdraw.status==='PENDING'?'pending':''">
                {{ choosenWithdraw.status }}</p>
            </section>
          </td>
          <td>
            <button @click="choosenOpen=false;getWithdraws();backRequest()">Back</button>
          </td>
        </tr>
        <tr>
          <td @click="copyText(`/res ${choosenWithdraw.nickname}`)">
            <button>Copy /res</button>
          </td>
          <td>

          </td>
          <td @click="comment='User doesn\'t exist'">
            <button>User doesn't exist</button>
          </td>
          <td>
            <input type="text" placeholder="comment" v-model="comment">
          </td>
          <td>
            <button v-on:mousedown="startTimer" v-on:mouseup="endTimer" class="cancel-btn">Cancel</button>
          </td>
          <td>

          </td>
        </tr>
        <tr>
          <td>
            <button v-on:mousedown="confirmStartTimer" v-on:mouseup="confirmEndTimer" class="completed-btn">Completed
            </button>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="6">
            <p class="error" v-if="errorStatus">{{ errorText }}</p>
            <p class="success" v-if="successStatus">{{ successText }}</p>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<style scoped lang="scss">

.success {
  background: #adfda8;
  border: 1px solid green;
}

button {
  border: none;
  background: #000;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: rgba(0, 0, 0, 0.8);
}

table {
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

td:last-of-type {
  text-align: center;
}

tbody > tr:nth-of-type(even) {
  background-color: rgb(237 238 242);
}

.refresh {
  cursor: pointer;
  user-select: none;
}

.error {
  margin: 5px;
  background: rgba(255, 0, 0, 0.31);
  border: 1px solid red;
  padding: 5px;
  border-radius: 5px;
}

.cancel-btn {
  background: darkred;
}

.cancel-btn:hover {
  background: red;
}

.completed-btn {
  background: rgba(0, 128, 0, 0.53);
}

.completed-btn:hover {
  background: green;
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
  text-align: center;
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