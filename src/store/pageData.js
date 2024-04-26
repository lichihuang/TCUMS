import { defineStore } from 'pinia';

export const usePageDataStore = defineStore({
  id: 'pageData',
  state: () => ({
    searchCriteria: '',
  }),
  actions: {
    setSearchCriteria(criteria) {
      this.searchCriteria = criteria;
    },
  },
});