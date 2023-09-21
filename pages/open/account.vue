<script setup lang="ts">

</script>

<template>
  <h2 class="main-block-header">Account</h2>
  <div class="description">
    <p>Account for basic operations</p>
    <ul>
      <li>– Save up funds for various purposes</li>
      <li>– Pay for purchases and services</li>
      <li>– Transfer money</li>
    </ul>
  </div>
  <h2 class="main-block-header">Fill in the form</h2>
  <form action="#">
    <label for="name">Account name:</label>
    <input type="text" name="name" id="name" placeholder="Example: for the construction of the stadium">
    <input type="submit" value="Open an account">
  </form>
</template>

<style scoped lang="scss">
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