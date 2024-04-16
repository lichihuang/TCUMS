import { defineStore } from 'pinia';

export const printSelectionStore = defineStore({
  id: 'printSelection',
  state: () => ({
    selectedItems: [],
  }),
  actions: {
    addSelectedItem(item) {
      if (!this.selectedItems.includes(item)) {
        this.selectedItems.push(item);
        console.log(`Item ${item} has been added.`);
      }
    },
    removeSelectedItem(item) {
      const index = this.selectedItems.indexOf(item);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
        console.log(`Item ${item} has been removed.`);
      }
    },
    clearSelectedItems() {
      this.selectedItems = [];
      console.log("All items cleared");
    },
    selectAllItems(items) {
      this.selectedItems = items;
      console.log("All items selected:", items);
    },
  },
  getters: {
    getSelectedItems() {
      return this.selectedItems;
    },
  },
});