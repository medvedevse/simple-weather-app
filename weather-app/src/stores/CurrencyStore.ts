import { defineStore } from 'pinia';
import axios from 'axios';

interface CurrencyData {
  Date: string;
  Valute: {
    USD: {
      Name: string;
      Value: string;
    };
    EUR: {
      Name: string;
      Value: string;
    };
    BYN: {
      Name: string;
      Value: string;
    };
    CNY: {
      Name: string;
      Value: string;
    };
    KZT: {
      Name: string;
      Value: string;
    };
  };
}

interface CryptoCurrencyData {
  0: {
    name: string;
    price_usd: string;
  };
  1: {
    name: string;
    price_usd: string;
  };
  2: {
    name: string;
    price_usd: string;
  };
  3: {
    name: string;
    price_usd: string;
  };
}

export const useCurrencyStore = defineStore('currencyStore', {
  state: () => ({
    isLoading: false,
    currencyData: {} as CurrencyData,
    cryptoCurrencyData: [] as unknown as CryptoCurrencyData,
    activeTab: 1
  }),
  actions: {
    async getCurrencies() {
      this.isLoading = true;
      try {
        const { data } = await axios.get(`https://www.cbr-xml-daily.ru/daily_json.js`);
        this.currencyData = data;
        this.currencyData.Date = new Date(data.Date).toLocaleDateString();

        const { data: crypto } = await axios.get(
          `https://api.coinlore.net/api/ticker/?id=90,80,54683,28`
        );
        this.cryptoCurrencyData = crypto;
      } catch (err) {
        alert(`Возникла ошибка: ${err}`);
      } finally {
        this.isLoading = false;
      }
    },
    setActiveTab(id: number) {
      this.activeTab = id;
    }
  }
});
