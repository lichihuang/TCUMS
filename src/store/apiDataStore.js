import { defineStore } from 'pinia';

export const useApiDataStore = defineStore({
  id: 'apiDataStore',
  state: () => ({
    apiData: [], 
    printSelection: [], 
    selectedData: [], 
    formData: {
      inputEarlyWarningCourses: '', 
      inputEarlyWarningRequiredCourses: '', 
      inputStudentID: '', 
      inputAcademicYear: '', 
      inputSemester: '', 
      selectedCollege: '', 
      selectedDepartment: '', 
    },
  }),
  actions: {
    // 設置 API 數據
    setApiData(data) {
      this.apiData = data;
    },
    // 設置列印選擇
    setPrintSelection(selection) {
      this.printSelection = selection;
    },
    // 設置選擇的數據
    setSelectedData(data) {
      this.selectedData = data;
    },
    // 設置表單數據
    setFormData(data) {
      this.formData = { ...this.formData, ...data };
    },
  },
  getters: {
    // 獲取 API 數據
    getApiData() {
      return this.apiData;
    },
    getPrintSelection() {
      return this.printSelection;
    },
    getSelectedData() {
      return this.selectedData;
    },
    getFormData() {
      return this.formData;
    }
  },
  persist: {
    storage: sessionStorage, 
  }
});
