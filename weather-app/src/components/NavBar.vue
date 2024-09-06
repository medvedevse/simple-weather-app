<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav>
    <RouterLink to="/">Главная</RouterLink>
    <RouterLink to="/info">Курс валюты</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  gap: 10px;
}
</style>
