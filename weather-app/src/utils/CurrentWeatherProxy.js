// https://dashboard.scraperapi.com/apiplayground - 1000 запросов/месяц
import { useWeatherStore } from '../stores/WeatherStore';

const scraperapiApiKey = 'e895bf9dd111cb1f8ac955499951db86';
const scraperapiCountry = 'eu'

export default async function createProxyCurrentForecast() {
  return await fetch(
    `https://api.scraperapi.com/?api_key=${scraperapiApiKey}&url=https%3A%2F%2Fapi.weather.com%2Fv3%2Fwx%2Fobservations%2Fcurrent%3Fgeocode%3D${useWeatherStore().geo.lat}%2C${useWeatherStore().geo.lon}%26apiKey%3De1f10a1e78da46f5b10a1e78da96f525%26format%3Djson%26units%3Dm%26language%3Dru-RU&country_code=${scraperapiCountry}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });

  //https://app.scrapingant.com/dashboard - 1000 запросов/месяц

  // const currentWeatherKey = 'e1f10a1e78da46f5b10a1e78da96f525';
  // const scrapingantApiKey = 'ae9320c42a994ff6ae59db86b40d94d0';
  // const scrapingantCountry = 'DE';

  // let options = {
  //   method: 'GET',
  //   headers: {
  //     'x-api-key': scrapingantApiKey,
  //     useQueryString: true
  //   }
  // };

  // return await fetch(
  //   `https://api.scrapingant.com/v2/extract?url=https%3A%2F%2Fapi.weather.com%2Fv3%2Fwx%2Fobservations%2Fcurrent%3Fgeocode%3D${useWeatherStore().geo.lat}%2C${useWeatherStore().geo.lon}%26apiKey%3D${currentWeatherKey}%26format%3Djson%26units%3Dm%26language%3Dru-RU&proxy_country=${scrapingantCountry}&extract_properties=text`,
  //   options
  // )
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .catch((error) => {
  //     throw new Error('There was a problem with the fetch operation:', error);
  //   });
}