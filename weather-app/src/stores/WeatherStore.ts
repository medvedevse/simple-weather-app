import { defineStore } from 'pinia';
import axios from 'axios';

interface WeatherData {
  calendarDayTemperatureMax: string;
  calendarDayTemperatureMin: string;
  narrative: string;
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
    currentWeatherData: {} as CurrentWeatherData
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
        alert(`Возникла ошибка: ${err}`);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
