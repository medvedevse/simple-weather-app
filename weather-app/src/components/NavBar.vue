<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
<nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/info">Currency</RouterLink>
      </nav>
</template>

<style scoped>
nav {
  display: flex;
  gap: 10px;
}
</style>