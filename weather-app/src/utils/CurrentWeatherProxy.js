//https://app.scrapingant.com/dashboard
import { useWeatherStore } from '../stores/WeatherStore';

const currentWeatherKey = 'e1f10a1e78da46f5b10a1e78da96f525';
const proxyApiKey = 'ae9320c42a994ff6ae59db86b40d94d0';
const proxyCountry = 'DE';

export default async function createProxyCurrentForecast() {
  let options = {
    method: 'GET',
    headers: {
      'x-api-key': proxyApiKey,
      useQueryString: true
    }
  };

  return await fetch(
    `https://api.scrapingant.com/v2/extract?url=https%3A%2F%2Fapi.weather.com%2Fv3%2Fwx%2Fobservations%2Fcurrent%3Fgeocode%3D${useWeatherStore().geo.lat}%2C${useWeatherStore().geo.lon}%26apiKey%3D${currentWeatherKey}%26format%3Djson%26units%3Dm%26language%3Dru-RU&proxy_country=${proxyCountry}&extract_properties=text`,
    options
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error('There was a problem with the fetch operation:', error);
    });
}
