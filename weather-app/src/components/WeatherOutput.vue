<script setup lang="ts">
import Loading from './LoadingComponent.vue';
import WeatherForm from './WeatherForm.vue';
import { useWeatherStore } from '../stores/WeatherStore';
import OutputItem from './OutputItem.vue';

const weatherStore = useWeatherStore();
</script>

<template>
  <WeatherForm v-model="weatherStore.address" @get-сity="weatherStore.getCity" />
  <Loading v-if="weatherStore.isLoading" />
  <div v-else class="weather-data">
    <OutputItem
      :item="weatherStore.cityInfo ? `Город: ${weatherStore.cityInfo}` : weatherStore.emptyCityName"
      :class="['city']"
    />
    <div v-if="weatherStore.cityInfo" class="weather-city-data">
      <div class="current-day">Сегодня:</div>
      <OutputItem
        :item="`Днем: ${weatherStore.weatherData.calendarDayTemperatureMax[0]}°C`"
        :class="['temperature']"
      />
      <OutputItem
        :item="`Ночью: ${weatherStore.weatherData.calendarDayTemperatureMin[0]}°C`"
        :class="['night-temperature']"
      />
      <OutputItem :item="weatherStore.weatherData.narrative[0]" :class="['description']" />
      <div class="current-day">Завтра:</div>
      <OutputItem
        :item="`Днем: ${weatherStore.weatherData.calendarDayTemperatureMax[1]}°C`"
        :class="['temperature']"
      />
      <OutputItem
        :item="`Ночью: ${weatherStore.weatherData.calendarDayTemperatureMin[1]}°C`"
        :class="['night-temperature']"
      />
      <OutputItem :item="weatherStore.weatherData.narrative[1]" :class="['description']" />
      <div class="current-day">Послезавтра:</div>
      <OutputItem
        :item="`Днем: ${weatherStore.weatherData.calendarDayTemperatureMax[2]}°C`"
        :class="['temperature']"
      />
      <OutputItem
        :item="`Ночью: ${weatherStore.weatherData.calendarDayTemperatureMin[2]}°C`"
        :class="['night-temperature']"
      />
      <OutputItem :item="weatherStore.weatherData.narrative[2]" :class="['description']" />
    </div>
  </div>
</template>

<style>
.weather-data {
  .city {
    color: #16a776;
  }
  .current-day {
    font-weight: bold;
  }
}
</style>
