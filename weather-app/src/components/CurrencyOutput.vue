<script setup lang="ts">
import Loading from '../components/Loading.vue';
import PressButton from './PressButton.vue';
import { useCurrencyStore } from '../stores/CurrencyStore';

const currencyStore = useCurrencyStore();
currencyStore.getCurrencies();
</script>

<template>
  <div class="tabs">
    <PressButton
      text="Currency"
      :class="{ active: currencyStore.activeTab === 1 }"
      @click="currencyStore.setActiveTab(1)"
    />
    <PressButton
      text="Crypto Currency"
      :class="{ active: currencyStore.activeTab === 2 }"
      @click="currencyStore.setActiveTab(2)"
    />
  </div>

  <Loading v-if="currencyStore.isLoading" />
  <div v-else>
    <div class="current-date">Дата обновления: {{ currencyStore.currencyData.Date }}</div>
    <div class="data-wrapper">
      <div
        v-if="currencyStore.activeTab === 1 && currencyStore.currencyData.Valute"
        class="currency-data"
      >
        <div class="usd">
          {{ currencyStore.currencyData.Valute.USD.Name }}:
          {{ Number(currencyStore.currencyData.Valute.USD.Value).toFixed(2) }}₽
        </div>
        <div class="eur">
          {{ currencyStore.currencyData.Valute.EUR.Name }}:
          {{ Number(currencyStore.currencyData.Valute.EUR.Value).toFixed(2) }}₽
        </div>
        <div class="byn">
          {{ currencyStore.currencyData.Valute.BYN.Name }}:
          {{ Number(currencyStore.currencyData.Valute.BYN.Value).toFixed(2) }}₽
        </div>
        <div class="cny">
          {{ currencyStore.currencyData.Valute.CNY.Name }}:
          {{ Number(currencyStore.currencyData.Valute.CNY.Value).toFixed(2) }}₽
        </div>
        <div class="kzt">
          {{ currencyStore.currencyData.Valute.KZT.Name }}:
          {{ Number(currencyStore.currencyData.Valute.KZT.Value).toFixed(2) }}₽
        </div>
      </div>

      <div
        v-if="currencyStore.activeTab === 2 && currencyStore.cryptoCurrencyData"
        class="crypto-currency-data"
      >
      <div v-for="coin in currencyStore.cryptoCurrencyData" :key="coin.id">
        <div class="coin">
          {{ coin.name }}:
          {{ Number(coin.price_usd).toFixed(2) }}$
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.data-wrapper {
  display: flex;
  gap: 50px;
}

.current-date {
  font-weight: bold;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}
</style>
