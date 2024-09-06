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
      <div class="wrapper">
        <div class="current-day">Сегодня: <span>{{ weatherStore.currentWeatherData.wxPhraseLong }}</span></div>
        <div class="current-day-wrapper">
          <div class="current-day-container">
            <OutputItem
              :item="`Сейчас: ${weatherStore.currentWeatherData.temperature}°C `"
              :class="['current-temperature']"
            />
            <OutputItem
              :item="`Ощущается: ${weatherStore.currentWeatherData.temperatureFeelsLike}°C`"
              :class="['feels-like']"
            />
          </div>
          <div class="current-day-container">
            <OutputItem
              :item="`Днем: ${weatherStore.weatherData.calendarDayTemperatureMax[0]}°C`"
              :class="['temperature']"
            />
            <OutputItem
              :item="`Ночью: ${weatherStore.weatherData.calendarDayTemperatureMin[0]}°C`"
              :class="['night-temperature']"
            />
          </div>
          <div class="current-day-container">
        <OutputItem :item="`Влажность: ${weatherStore.currentWeatherData.relativeHumidity}%`" :class="['humidity']" />
        <OutputItem :item="`Ветер: ${weatherStore.currentWeatherData.windSpeed}м/c`" :class="['wind']" />
        </div>
        </div>
      </div>
      <div class="wrapper">
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
      </div>
      <div class="wrapper">
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
  </div>
</template>

<style>
.weather-data {
  .city {
    color: #16a776;
    margin-bottom: 5px;
  }

  .current-day {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .wrapper {
    max-width: 500px;
    border: 1px solid #16a776;
    border-radius: 15px;
    padding: 10px;
    margin-bottom: 10px;
  }

  .current-day-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  .current-day-container {
    border: 1px solid #16a776;
    border-radius: 10px;
    padding: 2px; 
    padding-right: 5px;
    padding-left: 5px;
  }
}
</style>
