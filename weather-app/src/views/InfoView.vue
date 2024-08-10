<script setup lang='ts'>
  import Header from '../components/PageHeader.vue';
  import CurrencyOutput from '../components/CurrencyOutput.vue';

</script>

<template>
  <div class="info">
    <Header title='Currency Info'/>
    <CurrencyOutput />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .info {
    min-height: 100vh;
  }
}
</style>
