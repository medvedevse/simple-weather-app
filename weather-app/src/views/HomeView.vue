<script setup lang="ts">
import Header from '../components/PageHeader.vue';
import Weather from '../components/WeatherOutput.vue';
</script>

<template>
  <main>
    <div class="home">
      <div class="header-wrapper">
        <Header title="Weather Info" />
        <img src="../assets/weather.svg" alt="Weather icon" width="50" height="50" />
      </div>
      <Weather />
    </div>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
  }
}

.header-wrapper {
  display: flex;
  img {
    align-self: center;
  }
}
</style>
