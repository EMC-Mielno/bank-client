<script setup lang="ts">

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
    <label for="cashback">Cashback percentage: <span class="hint-button">❔<span class="hint">The maximum percentage that will be returned to the user from the purchase price. You can specify from 0 to 30.</span></span></label>
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

span.hint-button:hover span.hint {
  opacity: 1;
}

span.hint-button {
  position: relative;
  cursor: pointer;
}

span.hint {
  position: absolute;
  bottom: 0;
  left: 30px;
  width: 440px;
  background: #f0f1f3;
  padding: 15px;
  border-radius: 10px;
  line-height: 30px;
  border: 1px solid;
  opacity: 0;
  transition: 0.2s;
}
</style>