<script setup lang="ts">

import Hint from "~/components/hint.vue";
</script>

<template>
  <h2 class="main-block-header">Business account</h2>
  <div class="description">
    <p>Account for accepting payment in your store</p>
    <ul>
      <li>– Create payment invoices for accepting payments</li>
      <li>– Increase cashback to get more buyers</li>
    </ul>
  </div>
  <h2 class="main-block-header">Fill in the form</h2>
  <form v-on:submit.prevent="">
    <label for="cashback">Cashback percentage: <hint>The maximum percentage that will be returned to the user from the purchase price. You can specify from 0 to 30.</hint></label>
    <input type="number" name="cashback" id="cashback" placeholder="15%" min="0" max="30" pattern="\d{1,2}">
    <div class="checkbox">
      <input type="checkbox" id="scales" name="scales"/>
      <label for="scales">Agree</label>
    </div>
    <input type="submit" value="Open an business account">
  </form>
</template>

<style scoped lang="scss">
.checkbox {
  display: flex;
}

label {
  margin-bottom: 15px;
  display: block;
}

p {
  margin-bottom: 30px;
}

li {
  margin-bottom: 15px;
}

li:last-child {
  margin: 0;
}
</style>