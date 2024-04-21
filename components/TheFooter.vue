<script setup lang="ts">

</script>

<template>
  <footer>
    <div class="footer-left">
      <h3>Documentation</h3>
      <ul>
        <li><a href="/docs/service-agreement">Service agreements</a></li>
        <li><a href="/docs/service-agreement#terms-of-use">Terms of use</a></li>
        <li><a href="/docs/service-agreement#terms-of-use">Privacy policy</a></li>
      </ul>
    </div>

    <div class="footer-right">
      <h3>Contact Us</h3>
      <p>Support: <a href="https://discord.gg/F3QDbNB8">create a ticket</a></p>
    </div>

    <p>&copy; 2024 All rights reserved. All trademarks belong to their respective owners.</p>
  </footer>
</template>

<style scoped lang="scss">
footer {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0 auto;
  max-width: 1680px;
}

.footer-left, .footer-right {
  width: 45%;
}

h3 {
  font-size: 1.2em;
  color: #333;
  margin-bottom: 25px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: #666;
}

.footer-right p {
  margin-bottom: 10px;
}

.footer-right a {
  color: #007bff;
}
</style>