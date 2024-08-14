<script setup lang="ts">
import Loading from './LoadingComponent.vue';
import WeatherForm from './WeatherForm.vue';
import { useWeatherStore } from '../stores/WeatherStore';
import OutputItem from './OutputItem.vue';

const weatherStore = useWeatherStore();
</script>

<template>
  <WeatherForm v-model="weatherStore.city" @get-сity="weatherStore.getCity" />
  <Loading v-if="weatherStore.isLoading" />
  <div v-else class="weather-data">
    <OutputItem
      :item="
        weatherStore.weatherData.name
          ? `Город: ${weatherStore.weatherData.name}`
          : weatherStore.emptyCityName
      "
      :class="['city']"
    />
    <div v-if="weatherStore.weatherData.name" class="weather-city-data">
      <OutputItem
        :item="`Температура: ${Math.round(Number(weatherStore.weatherData.main.temp))}°C`"
        :class="['temperature']"
      />
      <OutputItem
        :item="`Ощущается: ${Math.round(Number(weatherStore.weatherData.main.feels_like))}°C`"
        :class="['feels-like']"
      />
      <OutputItem
        :item="`Влажность: ${Math.round(Number(weatherStore.weatherData.main.humidity))}%`"
        :class="['humidity']"
      />
      <OutputItem
        :item="`Облачность: ${weatherStore.weatherData.weather[0].description}`"
        :class="['description']"
      />
      <OutputItem
        :item="`Ветер: ${Math.round(Number(weatherStore.weatherData.wind.speed))}м/c`"
        :class="['wind']"
      />
    </div>
  </div>
</template>

<style>
.weather-data {
  .city {
    color: #16a776;
  }
}
</style>
