<script setup lang="ts">
import PressButton from './PressButton.vue';
import { useCurrencyStore } from '../stores/CurrencyStore';

const currencyStore = useCurrencyStore();
</script>

<template>
  <div class="tabs">
    <PressButton
      text="Валюта"
      :class="{ active: currencyStore.activeTab === 1 }"
      @click="currencyStore.setActiveTab(1)"
    />
    <PressButton
      text="Криптовалюта"
      :class="{ active: currencyStore.activeTab === 2 }"
      @click="currencyStore.setActiveTab(2)"
    />
  </div>
</template>

<style>
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}
</style>
