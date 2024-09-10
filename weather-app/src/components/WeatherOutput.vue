<script setup lang="ts">
import WeatherForm from './WeatherForm.vue';
import { useWeatherStore } from '../stores/WeatherStore';
import OutputItem from './OutputItem.vue';
import WeatherLoader from './WeatherLoader.vue';

const weatherStore = useWeatherStore();
</script>

<template>
  <WeatherForm v-model="weatherStore.address" @get-forecast="weatherStore.getCity" />
  <WeatherLoader v-if="weatherStore.isLoading" />
  <div v-else class="weather-data">
    <div>
      <OutputItem
        :item="
          weatherStore.cityInfo && weatherStore.weatherData.calendarDayTemperatureMax
            ? `Местоположение: ${weatherStore.cityInfo}`
            : weatherStore.emptyCityName
        "
        :class="['location']"
      />
      <div
        v-if="weatherStore.cityInfo && weatherStore.weatherData.calendarDayTemperatureMax"
        class="weather-city-data"
      >
        <div class="wrapper">
          <div class="current-day">
            Сегодня: <span>{{ weatherStore.currentWeatherData.wxPhraseLong }}</span>
          </div>
          <div class="current-day-wrapper">
            <div class="current-day-container" v-if="weatherStore.currentWeatherData.temperature">
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
            <div
              class="current-day-container"
              v-if="weatherStore.currentWeatherData.relativeHumidity"
            >
              <OutputItem
                :item="`Влажность: ${weatherStore.currentWeatherData.relativeHumidity}%`"
                :class="['humidity']"
              />
              <OutputItem
                v-if="
                  Math.round((Number(weatherStore.currentWeatherData.windSpeed) * 1000) / 3600) > 0
                "
                :item="`Ветер: ${Math.round((Number(weatherStore.currentWeatherData.windSpeed) * 1000) / 3600)}м/c`"
                :class="['wind']"
              />
            </div>
          </div>
        </div>
        <div class="wrapper">
          <div class="tomorrow-day">Завтра:</div>
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
          <div class="after-tomorrow">Послезавтра:</div>
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
  </div>
</template>

<style>
.weather-data {
  .location {
    margin-bottom: 5px;
  }

  .current-day,
  .tomorrow-day,
  .after-tomorrow {
    font-weight: bold;
  }

  .current-day {
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
    gap: 5px 15px;
  }

  .current-day-container:first-child {
    border: 1px solid #16a776;
    border-radius: 10px;
    padding: 2px 5px;
  }
}
</style>
