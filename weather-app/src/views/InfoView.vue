<script setup lang="ts">
import Header from '../components/PageHeader.vue';
import CurrencyOutput from '../components/CurrencyOutput.vue';
</script>

<template>
  <div class="info">
    <div class="info-header-wrapper">
      <Header title="Currency Info" />
      <img src="../assets/currency.svg" alt="Currency icon" width="40" height="40" />
    </div>
    <CurrencyOutput />
  </div>
</template>

<style>
.info-header-wrapper {
  display: flex;
  gap: 10px;
  img {
    align-self: center;
  }
}
</style>
