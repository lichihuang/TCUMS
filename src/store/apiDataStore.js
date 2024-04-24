import { defineStore } from 'pinia';

export const useApiDataStore = defineStore({
  id: 'apiDataStore',
  state: () => ({
    apiData: [],
    printSelection: [],
    selectedData: [],
  }),
  actions: {
    setApiData(data) {
      this.apiData = data;
    },
    setPrintSelection(selection) {
      this.printSelection = selection;
    },
    setSelectedData(data) {
      this.selectedData = data;
    },
  },
  getters: {
    getApiData() {
      return this.apiData;
    },
    getPrintSelection() {
      return this.printSelection;
    },
    getSelectedData() {
      return this.selectedData;
    },
  },
});