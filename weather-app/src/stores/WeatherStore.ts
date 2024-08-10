import { defineStore } from 'pinia';
import axios from 'axios';

interface WeatherData {
  name: string;
  main: {
    temp: string;
    feels_like: string;
    humidity: string;
  };
  weather: {
    0: {
      description: string;
    };
  };
  wind: {
    speed: string;
  };
}

export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    key: 'ae829a076a4da54216d00041c8e44ff7',
    isLoading: false,
    weatherData: {} as WeatherData,
    city: '',
    geo: {} as { lat: string; lon: string },
    emptyCityName: ''
  }),
  actions: {
    async getCity() {
      this.isLoading = true;
      try {
        if (!this.city) {
          this.weatherData = {} as WeatherData;
          this.emptyCityName = 'Пожалуйста, введите город';
          return;
        }
        const { data } = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
          params: {
            q: this.city,
            limit: 1,
            appid: this.key
          }
        });
        if (!data.length) {
          this.weatherData = {} as WeatherData;
          this.emptyCityName = 'Город не найден';
          return;
        }
        this.geo = {
          lat: data[0].lat,
          lon: data[0].lon
        };
        const { data: weather } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              lat: this.geo.lat,
              lon: this.geo.lon,
              appid: this.key,
              units: 'metric',
              lang: 'ru'
            }
          }
        );
        this.weatherData = weather;
      } catch (err) {
        alert(`Возникла ошибка: ${err}`);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
