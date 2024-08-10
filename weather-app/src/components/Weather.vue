<script setup lang="ts">
import Loading from './Loading.vue';
import WeatherForm from './WeatherForm.vue';
import { useWeatherStore } from '../stores/WeatherStore';

const weatherStore = useWeatherStore();
</script>

<template>
  <WeatherForm v-model="weatherStore.city" @get-сity="weatherStore.getCity" />
  <Loading v-if="weatherStore.isLoading" />
  <div v-else class="weather-data">
    <div class="city">
      {{
        weatherStore.weatherData.name
          ? `Город: ${weatherStore.weatherData.name}`
          : weatherStore.emptyCityName
      }}
    </div>
    <div v-if="weatherStore.weatherData.name" class="weather-city-data">
      <div class="temperature">
        {{ `Температура: ${Math.round(Number(weatherStore.weatherData.main.temp))}°C` }}
      </div>

      <div class="feels-like">
        {{ `Ощущается: ${Math.round(Number(weatherStore.weatherData.main.feels_like))}°C` }}
      </div>

      <div class="humidity">
        {{ `Влажность: ${Math.round(Number(weatherStore.weatherData.main.humidity))}%` }}
      </div>

      <div class="description">
        {{ `Облачность: ${weatherStore.weatherData.weather[0].description}` }}
      </div>

      <div class="wind">
        {{ `Ветер: ${Math.round(Number(weatherStore.weatherData.wind.speed))}м/c` }}
      </div>
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
