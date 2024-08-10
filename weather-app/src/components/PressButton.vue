<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <button class="btn">{{ text }}</button>
</template>

<style>
.btn {
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  background-color: #1aab7a;
  padding: 5px;
  font-weight: bold;
}
.active {
  background-color: #659079;
}
</style>
