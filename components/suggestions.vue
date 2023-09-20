<script setup lang="ts">

</script>

<template>
  <div class="suggestions-blocks">
    <div class="suggestions-block">
      <div class="suggestion-category">New</div>
      <h5 class="suggestions-title">Buy tickets to the event on TicketArena</h5>
      <p class="suggestions-description">Payment will be made instantly via MPay</p>
    </div>
    <div class="suggestions-block">
      <div class="suggestion-category">New</div>
      <h5 class="suggestions-title">A wide variety of products on the MarketPlace</h5>
      <p class="suggestions-description">Payment will be made instantly via MPay</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.suggestions-blocks {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.suggestions-block {
  background: #D2E0FD;
  width: 270px;
  height: 165px;
  border-radius: 10px;
  padding: 15px;
}

.suggestions-blocks {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.suggestion-category {
  text-transform: uppercase;
  margin-bottom: 30px;
}

p.suggestions-description {
  font-size: smaller;
}

h5.suggestions-title {
  font-size: medium;
  margin-bottom: 5px;
}
</style>