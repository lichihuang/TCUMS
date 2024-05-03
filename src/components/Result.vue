<template>
  <div class="container col-md-12 col-lg-12">
    <main>
      <div class="py-5 text-center">
        <h3>期中預警通知列印</h3>
        <hr />
      </div>
      <section>
        <div class="card">
          <div class="card-header">
            <div class="form-outline" data-mdb-input-init>
              <input
                type="text"
                class="form-control"
                v-model="searchTerm"
                @input="handleSearch"
              />
              <label
                class="form-label"
                for="datatable-search-input"
                style="margin-left: 0px"
                >Search</label
              >
              <div class="form-notch">
                <div class="form-notch-leading" style="width: 9px"></div>
                <div class="form-notch-middle" style="width: 47.2px"></div>
                <div class="form-notch-trailing"></div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div
              class="datatable datatable-bordered datatable-striped"
              style="max-width: 100%"
            >
              <div
                class="datatable-inner table-responsive"
                style="overflow: auto; position: relative"
              >
                <div
                  class="ps ps--active-x"
                  style="width: 100%; height: 100%; background-color: inherit"
                >
                  <div class="table-responsive">
                    <table class="table table-striped table-sm7 mx-auto">
                      <thead>
                        <tr>
                          <th class="text-center bold">編號</th>
                          <th class="text-center bold">選擇列印</th>
                          <th class="bold">學生</th>
                          <th class="bold">期中預警紀錄</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in paginatedData"
                          :key="index"
                          class="floating-row"
                        >
                          <td class="text-center">{{ getSerialNumber(index) }}</td>
                          <td
                            class="text-center"
                            @click="handleCheckboxClick($event, index)"
                          >
                            <input type="checkbox" v-model="printSelection[index]" />
                          </td>
                          <td v-if="item.warnings && item.warnings.length > 0">
                            <div v-for="(warning, wIndex) in item.warnings" :key="wIndex">
                              <template
                                v-if="
                                  item.warnings &&
                                  item.warnings.length > 0 &&
                                  wIndex === 0
                                "
                              >
                                <b
                                  >{{ departmentName[index] }}&nbsp;{{ warning.degree
                                  }}{{ warning.studentClass }}<br />{{ item.studentId
                                  }}<br />{{ warning.studentName }}</b
                                ><br />
                                <span class="std-state-text"
                                  ><b>狀態：{{ studentState[index] }}</b></span
                                ><br />
                                <span class="etc-content-text">
                                  ★&nbsp;最近一次預覽列印紀錄&nbsp;★<br />
                                  Date：{{ formatDate(warning.insTime) }}<br />
                                  IP：{{ warning.insIP }}<br />
                                  User：{{ warning.insUser }}
                                </span>
                              </template>
                            </div>
                          </td>

                          <td
                            v-if="item.warnings && item.warnings.length > 0"
                            class="floating-row"
                          >
                            <div v-for="(warning, wIndex) in item.warnings" :key="wIndex">
                              <b>開課課程：</b>{{ warning.courseId }}&nbsp;-&nbsp;{{
                                warning.class
                              }}&nbsp;-&nbsp;{{ warning.courseName }}<br />
                              <b>學分數：</b
                              >{{ warning.credit }}&nbsp;學分&nbsp;&nbsp;&nbsp;<b
                                >開課教師：</b
                              >{{ warning.teacher }}&nbsp;&nbsp;&nbsp;<b>教師所屬系所：</b
                              >{{ teacherDepartment[index] }}<br />
                              <b>期中預警備註說明：</b>{{ warning.memo }}<br />
                              <span
                                v-if="wIndex === item.warnings.length - 1"
                                class="tch-insert-text"
                                >開課教師登錄日期：{{ formatDate(warning.insTime) }}</span
                              >
                              <hr v-if="wIndex < item.warnings.length - 1" />
                            </div>
                            <b class="total-credit"
                              ><span class="credit-text"
                                >★&nbsp;本學期總修習學分數&nbsp;/&nbsp;總預警學分數：{{
                                  item.warnings[item.warnings.length - 1].totalCredit
                                }}&nbsp;/&nbsp;{{
                                  item.warnings[item.warnings.length - 1].totalCredit
                                }}</span
                              ></b
                            >
                          </td>
                          <td v-else></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="ps__rail-x" style="left: 0px; bottom: 0px; width: 792px">
                    <div
                      class="ps__thumb-x"
                      tabindex="0"
                      style="left: 0px; width: 701px"
                    ></div>
                  </div>
                  <div class="ps__rail-y" style="top: 0px; right: 0px">
                    <div
                      class="ps__thumb-y"
                      tabindex="0"
                      style="top: 0px; height: 0px"
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                <div class="pagination">
                  <span class="rows-per-page">頁面筆數：</span>
                  <select class="perpage-size" v-model="itemsPerPage">
                    <option v-for="option in pageOptions" :key="option">
                      {{ option }}
                    </option>
                  </select>
                  <span
                    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ startIndex }}&nbsp;-&nbsp;{{
                      endIndex
                    }}&nbsp;&nbsp;of&nbsp;&nbsp;{{
                      totalItems
                    }}&nbsp;&nbsp;&nbsp;&nbsp;</span
                  >
                  <button
                    class="pagination-button"
                    @click="prevPage"
                    :disabled="currentPage === 1"
                  >
                    &lt;
                  </button>
                  <button
                    class="pagination-button"
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                  >
                    &gt;
                  </button>
                  <div v-if="showPrintContent">
                    <PrintContent ref="contentToPrint" />
                  </div>
                  <div class="resultPage-btn">
                    <button
                      @click="handlePrint"
                      class="btn-style w-10 btn btn-primary btn-md"
                      type="button"
                    >
                      列印 & PDF
                    </button>
                    <button
                      @click="buttonSelectAll"
                      class="btn-style w-10 btn btn-primary btn-md"
                      type="button"
                    >
                      全部選取
                    </button>
                    <button
                      @click="buttonDeselect"
                      class="btn-style w-10 btn btn-primary btn-md"
                      type="reset"
                    >
                      取消選取
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
  <PageController />
  <CopyrightNotice class="copyright" />
  <a href="https://lordicon.com/" class="icon-address">Icons by Lordicon.com</a>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useApiDataStore } from "../store/apiDataStore";
import CopyrightNotice from "../components/CopyrightNotice.vue";
import PageController from "../components/PageController.vue";
import PrintContent from "./PrintContent.vue";
import print from "vue3-print-nb";
import { deptName, stdState } from "../components/TransformData.js";
import sweetAlert from "../components/sweetAlert";

import { Input, initMDB } from "mdb-ui-kit";
initMDB({ Input });

export default {
  name: "Result",
  components: {
    CopyrightNotice,
    PageController,
    PrintContent,
  },
  directives: { print },
  props: ["searchData"],
  setup(props) {
    const router = useRouter();
    const pageOptions = [5, 10, 25, 50, 75, 100];
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const totalItems = computed(() => {
      const dataToCount = searchTerm.value ? filteredData.value : apiDataStore.getApiData;
      return dataToCount ? dataToCount.length : 0;
    });
    const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));
    const resultTitle = ref("");
    const printSelection = ref([]);
    const searchTerm = ref("");
    const filteredPages = ref([]);
    const startIndex = ref(1);
    const endIndex = computed(() => {
      return calculateEndIndex();
    });

    const apiDataStore = useApiDataStore();

    const formatDate = (timeString) => {
      const date = new Date(timeString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    };

    const departmentName = computed(() => {
      const result = [];
      for (const item of paginatedData.value) {
        for (const warning of item.warnings) {
          if (warning.department && deptName.hasOwnProperty(warning.department)) {
            result.push(deptName[warning.department]);
            break;
          }
        }
      }
      return result;
    });

    const teacherDepartment = computed(() => {
      const result = [];
      for (const item of paginatedData.value) {
        for (const warning of item.warnings) {
          if (warning.teacherDept && deptName.hasOwnProperty(warning.teacherDept)) {
            result.push(deptName[warning.teacherDept]);
            break;
          }
        }
      }
      return result;
    });

    const studentState = computed(() => {
      const result = [];
      for (const item of paginatedData.value) {
        for (const warning of item.warnings) {
          if (warning.state != null && stdState.hasOwnProperty(warning.state)) {
            result.push(stdState[warning.state]);
          } else {
            result.push("");
          }
          break;
        }
      }
      return result;
    });

    onMounted(async () => {
      if (router.params) {
        const { semester, year } = router.params;
        if (semester && year) {
          resultTitle.value = `${year}學年第${semester}學期期中預警學生`;
        }
      }
      watch(router.currentRoute, async (to, from) => {
        if (to.name !== from.name) {
          // 如果切換了頁面
          await updatePrintSelection(); // 更新勾選狀態
        }
      });
    });

    watch(
      () => apiDataStore.getApiData,
      (newValue, oldValue) => {
        if (newValue !== oldValue) {
          totalItems.value = newValue.length;
          totalPages.value = Math.ceil(totalItems.value / itemsPerPage.value);
        }
      },
      { deep: true }
    );

    watch(totalItems, () => {
      filteredPages.value = Array.from({ length: totalPages.value }, (_, i) => i + 1);
    });

    watch(totalPages, () => {
      filteredPages.value = Array.from({ length: totalPages.value }, (_, i) => i + 1);
    });

    watch([currentPage, itemsPerPage, totalItems], () => {
      calculateStartAndEndIndex();
    });

    watch(itemsPerPage, (/* newVal */) => {
      currentPage.value = 1;
      calculateStartAndEndIndex();
    });

    const toggleCheckbox = (index) => {
      printSelection.value[index] = !printSelection.value[index];
    };

    const handleCheckboxClick = (event, index) => {
      const pageIndex = (currentPage.value - 1) * itemsPerPage.value;
      const selectedIndex = pageIndex + index;
      printSelection.value[selectedIndex] = !printSelection.value[selectedIndex];
      updatePrintSelection();
    };

    const changePageSize = (value) => {
      itemsPerPage.value = parseInt(value);
      calculateEndIndex();
    };

    const selectAll = ref(false);

    function resetVariables() {
      currentPage.value = 1;
      startIndex.value = 1;
      calculateEndIndex();
    }

    const apiData = computed(() => apiDataStore.getApiData);

    const goToPage = (page) => {
      if (page < 1 || page > totalPages.value) return;
      currentPage.value = page;
      updatePrintSelection(); // 確保在切換頁面時同步更新選擇的資料
    };

    const paginatedData = computed(() => {
      const dataToPaginate = searchTerm.value ? filteredData.value : apiData.value;
      if (!dataToPaginate) return [];

      const startIdx = (currentPage.value - 1) * itemsPerPage.value;
      let endIdx = currentPage.value * itemsPerPage.value;

      if (endIdx > dataToPaginate.length) {
        endIdx = dataToPaginate.length;
      }

      return dataToPaginate.slice(startIdx, endIdx);
    });

    const getSerialNumber = (index) => {
      return (currentPage.value - 1) * itemsPerPage.value + index + 1;
    };

    const filteredData = computed(() => {
      const regex = new RegExp(searchTerm.value.trim(), "i");
      return apiDataStore.getApiData.filter((item) => {
        return Object.values(item).some((value) => regex.test(value));
      });
    });

    function calculateStartAndEndIndex() {
      startIndex.value = (currentPage.value - 1) * itemsPerPage.value + 1;
      calculateEndIndex();
    }

    function calculateEndIndex() {
      const startIdx = (currentPage.value - 1) * itemsPerPage.value + 1;
      const endIdx = currentPage.value * itemsPerPage.value;
      const endIndex = Math.min(endIdx, totalItems.value);
      return endIndex;
    }

    async function handleSearch() {
      try {
        const searchData = await fetchSearchData();
        console.log("搜索结果长度：", searchData.length);
        totalItems.value = searchData.length;
        resetVariables();
      } catch (error) {
        console.error("搜索发生错误：", error);
      }
    }

    async function fetchSearchData() {
      try {
        const response = await fetch("/api/search");
        if (!response.ok) {
          throw new Error("無法獲取相符的資料");
        }
        const searchData = await response.json();
        return searchData;
      } catch (error) {
        console.error("發生錯誤：", error);
        return [];
      }
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        window.scrollTo({ top: 0, behavior: "smooth" });
        updatePrintSelection();
      }
      /* apiDataStore.setSelectedData(selectedData); */
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        window.scrollTo({ top: 0, behavior: "smooth" });
        updatePrintSelection();
      }
      /* apiDataStore.setSelectedData(selectedData); */
    };

    const updatePrintSelection = async () => {
      const selectedIndexes = Object.keys(printSelection.value).filter(
        (index) => printSelection.value[index]
      );
      const selectedData = selectedIndexes.map((index) =>
        JSON.parse(JSON.stringify(apiDataStore.getApiData[index]))
      );
      apiDataStore.setSelectedData(selectedData);
    };

    const showPrintContent = ref(false);

    const handlePrint = async () => {
      console.log("printSelection：", printSelection.value);

      const selectedIndexes = Object.keys(printSelection.value).filter(
        (index) => printSelection.value[index]
      );

      if (Array.isArray(selectedIndexes) && selectedIndexes.length > 0) {
        const selectedData = selectedIndexes.map((index) =>
          JSON.parse(JSON.stringify(apiDataStore.getApiData[index]))
        );
        console.log("Selected Data:", selectedData);
        apiDataStore.setSelectedData(selectedData);
        console.log("apiDataStore 中被勾選的資料：", apiDataStore.getSelectedData);
        await router.push({ name: "PrintContent" });
      } else {
        sweetAlert.typicalType("注意", "尚未勾選資料列", "warning", `OK`);
      }
    };

    const buttonSelectAll = () => {
      selectAll.value = true;
      printSelection.value = Array.from(
        { length: apiDataStore.getApiData.length },
        () => true
      );
      console.log(printSelection.value);
    };

    const buttonDeselect = () => {
      selectAll.value = false;
      printSelection.value = [];
      console.log(printSelection.value);
    };

    return {
      pageOptions,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      resultTitle,
      paginatedData,
      printSelection,
      filteredPages,
      startIndex,
      endIndex,
      filteredData,
      searchTerm,
      departmentName,
      teacherDepartment,
      studentState,
      showPrintContent,
      changePageSize,
      goToPage,
      getSerialNumber,
      prevPage,
      nextPage,
      handleSearch,
      handlePrint,
      buttonSelectAll,
      buttonDeselect,
      formatDate,
      toggleCheckbox,
      handleCheckboxClick,
    };
  },
};
</script>

<style scoped>
@import "../style/ResultStyle.css";
</style>
