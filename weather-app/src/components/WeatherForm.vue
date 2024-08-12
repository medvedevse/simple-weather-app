<script setup lang="ts">
import PressButton from './PressButton.vue';

const model = defineModel();
defineEmits(['get-сity']);
</script>

<template>
  <section class="weather-section">
    <form @submit.prevent="" class="weather-form">
      <input type="text" v-model="model" placeholder="Enter city name" />
      <PressButton text="Press" @click="$emit('get-сity')" />
    </form>
  </section>
</template>

<style>
.weather-form {
  display: flex;
  gap: 10px;
  width: 30%;
  height: 30px;
  margin-bottom: 15px;

  input {
    width: 215px;
    min-width: 170px;
    font-size: 15px;
    border-radius: 5px;
  }
}
</style>
