<script setup lang="ts">
import { computed, ref } from 'vue';
import PressButton from './PressButton.vue';
import { useWeatherStore } from '@/stores/WeatherStore';
import { vOnClickOutside } from '@vueuse/components';

const model = defineModel();
const isActive = ref(false);

defineEmits(['get-forecast']);

const isValidLocation = computed(() => {
  const pattern = /^[a-zA-Zа-яА-Я\s]+$/;
  let value = model.value as string;
  return pattern.test(value) || value.trim().length == 0;
});

const store = useWeatherStore();
const getInputValue = () => {
  let currentInput = model.value as string;
  return currentInput;
};

const handleInput = () => {
  store.addInput(getInputValue());
};

const clickSuggest = (input: string) => {
  model.value = input;
};

const clickInput = () => {
  if (store.locations.length) {
    isActive.value = !isActive.value;
  }
};

const clickOutsideSuggests = () => (isActive.value = false);
</script>

<template>
  <section class="weather-section">
    <form @submit.prevent="" class="weather-form">
      <input
        type="text"
        v-model="model"
        placeholder="Введите местоположение"
        @input="getInputValue"
        @click="clickInput"
        v-on-click-outside="clickOutsideSuggests"
      />
      <PressButton
        text="Поиск"
        @click="
          $emit('get-forecast');
          handleInput();
        "
        :disabled="!isValidLocation"
        class="weather-form-button"
      />
    </form>
    <div ref="suggestsWrapper" class="suggests-wrapper" :class="{ show: isActive }">
      <ul class="weather-form-suggests">
        <li class="popular">Популярное</li>
        <li v-for="input in store.locations" :key="input">
          <a @click="clickSuggest(input)">{{ input }}</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style>
.suggests-wrapper {
  position: relative;
  transform: scale(0);
  box-shadow: 0 4px 16px 2px rgba(0, 26, 52, 0.16);
}

.suggests-wrapper.show {
  transform: scale(1);
}

.weather-form-suggests {
  overflow: hidden;
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  background: rgb(245, 247, 250);
  width: 15%;
  min-width: 200px;
  border: 1px solid black;
  border-radius: 5px;
  .popular {
    background: rgb(221, 226, 230);
    /* padding: 3px 7px; */
  }
  li {
    padding: 3px;
  }
  a {
    color: black;
    cursor: pointer;
  }
}
.weather-form {
  display: flex;
  gap: 10px;
  width: 30%;
  height: 30px;
  margin-bottom: 10px;

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
