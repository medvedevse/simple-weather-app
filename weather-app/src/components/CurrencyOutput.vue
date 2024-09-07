<script setup lang="ts">
import Loading from './LoadingComponent.vue';
import { useCurrencyStore } from '../stores/CurrencyStore';
import OutputItem from './OutputItem.vue';
import TabBar from '../components/TabBar.vue';

const currencyStore = useCurrencyStore();
currencyStore.getCurrencies();
currencyStore.getCryptoCurrencies();
</script>

<template>
  <TabBar />
  <Loading v-if="currencyStore.isLoading" />
  <div v-else>
    <OutputItem
      :item="`Дата обновления: ${currencyStore.currencyData.Date}`"
      :class="['current-date']"
    />
    <div class="data-wrapper">
      <div
        v-if="currencyStore.activeTab === 1 && currencyStore.currencyData.Valute"
        class="currency-data"
      >
        <OutputItem
          :item="`${currencyStore.currencyData.Valute.USD.Name}: ${Number(currencyStore.currencyData.Valute.USD.Value).toFixed(2)}₽`"
          :class="['usd']"
        />
        <OutputItem
          :item="`${currencyStore.currencyData.Valute.EUR.Name}: ${Number(currencyStore.currencyData.Valute.EUR.Value).toFixed(2)}₽`"
          :class="['eur']"
        />
        <OutputItem
          :item="`${currencyStore.currencyData.Valute.BYN.Name}: ${Number(currencyStore.currencyData.Valute.BYN.Value).toFixed(2)}₽`"
          :class="['byn']"
        />
        <OutputItem
          :item="`${currencyStore.currencyData.Valute.CNY.Name}: ${Number(currencyStore.currencyData.Valute.CNY.Value).toFixed(2)}₽`"
          :class="['cny']"
        />
        <OutputItem
          :item="`${currencyStore.currencyData.Valute.KZT.Name}: ${Number(currencyStore.currencyData.Valute.KZT.Value).toFixed(2)}₽`"
          :class="['kzt']"
        />
      </div>

      <div
        v-if="currencyStore.activeTab === 2 && currencyStore.cryptoCurrencyData"
        class="crypto-currency-data"
      >
        <div v-for="coin in currencyStore.cryptoCurrencyData" :key="coin.id">
          <OutputItem
            :item="`${coin.name}: ${Number(coin.price_usd).toFixed(2)}$`"
            :class="['coin']"
          />
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
</style>
