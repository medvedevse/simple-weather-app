<script setup lang="ts">
import { computed } from 'vue';
import PressButton from './PressButton.vue';

const model = defineModel();
defineEmits(['get-forecast']);

const isValidLocation = computed(() => {
  const pattern = /^[a-zA-Zа-яА-Я\s]+$/;
  let value = model.value as string;
  return pattern.test(value) || value.trim().length == 0;
});
</script>

<template>
  <section class="weather-section">
    <form @submit.prevent="" class="weather-form">
      <input type="text" v-model="model" placeholder="Введите местоположение" />
      <PressButton
        text="Поиск"
        @click="$emit('get-forecast')"
        :disabled="!isValidLocation"
        class="weather-form-button"
      />
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
    width: 100%;
    min-width: 215px;
    font-size: 15px;
    border-radius: 5px;
  }

  .weather-form-button {
    width: 100px;
    height: 29px;
  }
}
</style>
