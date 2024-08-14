<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <h1 class="page-header">{{ title }}</h1>
</template>

<style>
.page-header {
  margin-bottom: 5px;
}
</style>
