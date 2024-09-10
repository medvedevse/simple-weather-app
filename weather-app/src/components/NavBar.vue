<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav>
    <RouterLink to="/" class="nav-link">Главная</RouterLink>
    <RouterLink to="/info" class="nav-link">Курс валюты</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  gap: 5px;
  .nav-link{
    border-radius: 3px;
  }
}
</style>
