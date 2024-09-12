import { defineStore } from 'pinia';
import axios from 'axios';
import createProxyCurrentForecast from '../utils/CurrentWeatherProxy.js';

interface WeatherData {
  calendarDayTemperatureMax: string[];
  calendarDayTemperatureMin: string[];
  narrative: string[];
  dayOfWeek: string[];
}

interface CurrentWeatherData {
  temperature: string;
  temperatureFeelsLike: string;
  relativeHumidity: string;
  windSpeed: string;
  wxPhraseLong: string;
}

export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    opencCageDataKey: 'db44e76644d44a60b5e3756b38fa0142',
    wundergroundKey: '9447a132b3234f4287a132b3232f429d',
    // брал ключ ниже на https://www.wunderground.com/ через devtools по поиску current
    currentWeatherKey: 'e1f10a1e78da46f5b10a1e78da96f525',
    isLoading: false,
    weatherData: {} as WeatherData,
    cityInfo: '',
    address: '',
    geo: {} as { lat: string; lon: string },
    emptyCityName: '',
    currentWeatherData: {} as CurrentWeatherData,
    locations: ['Энгельс', 'Энгельс, Степное', 'Саратов'] as string[]
  }),
  actions: {
    async getCity() {
      try {
        if (!this.address || this.address.length === 1) {
          this.weatherData = {} as WeatherData;
          this.emptyCityName = 'Пожалуйста, введите город';
          return;
        }
        this.isLoading = true;
        const { data } = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
          params: {
            q: this.address,
            key: this.opencCageDataKey
          }
        });
        if (!data.results.length) {
          this.cityInfo = '';
          this.weatherData = {} as WeatherData;
          this.emptyCityName = 'Город не найден';
          return;
        }
        this.geo = {
          lat: data.results[0].geometry.lat,
          lon: data.results[0].geometry.lng
        };
        this.cityInfo = data.results[0].formatted;
        await this.getForecast();
        await this.getCurrentForecast();
      } catch (err) {
        alert(`Возникла ошибка: ${err}`);
      }
    },
    async getForecast() {
      try {
        const { data: weather } = await axios.get(
          `https://api.weather.com/v3/wx/forecast/daily/5day`,
          {
            params: {
              geocode: `${this.geo.lat},${this.geo.lon}`,
              apiKey: this.wundergroundKey,
              format: 'json',
              units: 'm', // еще можно s и h для цельсия
              language: 'ru-RU'
            }
          }
        );
        this.weatherData = weather;
        console.log(this.weatherData);
      } catch (err) {
        alert(`Возникла ошибка: ${err}`);
      } finally {
        this.isLoading = false;
      }
    },
    async getCurrentForecast() {
      try {
        const { data: currentWeatherData } = await axios.get(
          `https://api.weather.com/v3/wx/observations/current`,
          {
            params: {
              geocode: `${this.geo.lat},${this.geo.lon}`,
              apiKey: this.currentWeatherKey,
              format: 'json',
              units: 'm',
              language: 'ru-RU'
            }
          }
        );
        this.currentWeatherData = currentWeatherData;
      } catch (err) {
        console.log(`Возникла ошибка: ${err}`);
        this.currentWeatherData = (await createProxyCurrentForecast()) as CurrentWeatherData;
      }
    },
    addInput(input: string) {
      if (input && !this.locations.includes(input)) {
        this.locations.unshift(input);
        if (this.locations.length > 3) {
          this.locations.pop();
        }
      }
    }
  }
});
