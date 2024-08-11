<script setup lang="ts">
import Header from '../components/PageHeader.vue';
import Weather from '../components/Weather.vue';
</script>

<template>
  <main>
    <div class="home">
      <div class="header-wrapper">
        <Header title="Weather Info" />
        <img src="../assets/logo.svg" alt="Logo" width="50" height="50" />
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

@media (max-width: 1024px) {
  .home {
    min-width: 500px;
  }
}

.header-wrapper {
  display: flex;
    img {
      align-self: center;
    }
}
</style>
