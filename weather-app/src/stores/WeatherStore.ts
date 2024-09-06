import { defineStore } from 'pinia';
import axios from 'axios';

interface WeatherData {
  calendarDayTemperatureMax: string;
  calendarDayTemperatureMin: string;
  narrative: string;
}

export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    opencCageDataKey: 'db44e76644d44a60b5e3756b38fa0142',
    wundergroundKey: '9447a132b3234f4287a132b3232f429d',
    isLoading: false,
    weatherData: {} as WeatherData,
    cityInfo: '',
    address: '',
    geo: {} as { lat: string; lon: string },
    emptyCityName: ''
  }),
  actions: {
    async getCity() {
      this.isLoading = true;
      try {
        if (!this.address) {
          this.weatherData = {} as WeatherData;
          this.emptyCityName = 'Пожалуйста, введите город';
          return;
        }
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
      } catch (err) {
        alert(`Возникла ошибка: ${err}`);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
