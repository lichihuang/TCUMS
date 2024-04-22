import { defineStore } from 'pinia';

export const useApiDataStore = defineStore({
  id: 'apiDataStore',
  state: () => ({
    apiData: [],
    printSelection: [],
  }),
  actions: {
    setApiData(data) {
      this.apiData = data;
    },
    setPrintSelection(selection) {
      this.printSelection = selection;
    },
  },
  getters: {
    getApiData() {
      return this.apiData;
    },
    getPrintSelection() {
      return this/* .$state */.printSelection;
    },
  },
});