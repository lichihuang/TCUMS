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
                        <tr v-for="(item, index) in paginatedData" :key="index">
                          <td class="text-center">{{ getSerialNumber(index) }}</td>
                          <td class="text-center">
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

                          <td v-if="item.warnings && item.warnings.length > 0">
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
                              <span class="etc-content-text"
                                >開課教師登錄日期：{{ formatDate(warning.insTime) }}</span
                              ><br />
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
                  <select v-model="itemsPerPage">
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
                  <div class="resultPage-btn">
                    <button
                      @click="buttonPrint"
                      class="btn-style w-10 btn btn-primary btn-md"
                      type="button"
                    >
                      列印
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
  <CopyrightNotice />
  <a href="https://lordicon.com/" class="icon-address">Icons by Lordicon.com</a>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useApiDataStore } from "../store/apiDataStore";
import CopyrightNotice from "../components/CopyrightNotice.vue";
import PageController from "../components/PageController.vue";

import { Input, initMDB } from "mdb-ui-kit";
initMDB({ Input });

export default {
  name: "Result",
  components: {
    CopyrightNotice,
    PageController,
  },
  props: ["searchData"],
  setup(props) {
    const pageOptions = [5, 10, 25, 50, 75, 100];
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const totalItems = computed(() => {
      const dataToCount = searchTerm.value ? filteredData.value : apiDataStore.getApiData;
      return dataToCount ? dataToCount.length : 0;
    });

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

    const deptName = {
      201: "國際服務產業管理學士學位學程",
      203: "國際數位媒體科技學士學位學程",
      204: "外國語文學系",
      235: "永續暨防災碩士學位學程",
      300: "醫學院-大學部",
      301: "醫學系",
      302: "醫學檢驗生物技術學系",
      303: "公共衛生學系",
      304: "護理學系",
      305: "醫學資訊學系",
      307: "物理治療學系",
      308: "學士後中醫學系",
      309: "生物醫學暨工程學系",
      321: "護理學系碩士班",
      323: "醫學檢驗生物技術學系碩士班",
      324: "公共衛生學系碩士班",
      325: "醫學資訊學系碩士班",
      331: "物理治療學系碩士班",
      333: "生物醫學碩士班",
      334: "臨床藥學研究所",
      337: "生物醫學暨工程學系碩士班",
      338: "學士後中醫學系碩士班",
      353: "醫學科學博士班",
      354: "轉役醫學博士學位學程",
      398: "醫學院-碩士班",
      500: "人文社會學院-大學部",
      501: "社會工作學系",
      502: "傳播學系",
      506: "人類發展與心理學系",
      521: "傳播學系碩士班",
      522: "社會工作學系碩士班",
      525: "東方語文學系碩士班",
      526: "宗教與人文研究所",
      532: "人類發展與心理學系碩士班臨床心理學組",
      534: "東方語文學系中文組",
      535: "東方語文學系日文組",
      600: "國際暨跨領域學院-大學部",
      610: "國際暨跨領域學院-碩士班",
      622: "教育研究所碩士在職專班",
      623: "護理學系碩士在職專班",
      702: "分子生物暨人類遺傳學系",
      721: "藥理暨毒理學碩士班",
      727: "分子生物暨人類遺傳學系碩士班",
      752: "藥理暨毒理學博士班",
      800: "教育傳播學院-大學部",
      801: "兒童發展與家庭教育學系",
      821: "健康傳播專題研究",
      831: "媒體製作暨教學中心",
      901: "通識教育中心",
      902: "體育教學中心",
      922: "師資培育中心",
      924: "外語教學中心",
      931: "華語教材教法",
      932: "社會工作學系碩士班",
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

    const stdState = {
      "01": "在學",
      "02": "休學",
      "03": "退學",
      "04": "保留學籍",
      "05": "畢業",
      "07": "未入學",
      "09": "交換結束",
      10: "放棄入學",
      11: "撤銷學籍",
      12: "先修結束",
      13: "研修結束",
      99: "不升級",
    };

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

    const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

    const resultTitle = ref("");
    const printSelection = ref([]);
    const searchTerm = ref("");
    const filteredPages = ref([]);
    const isInputFocused = ref(false);
    const startIndex = ref(1);
    const endIndex = computed(() => {
      return calculateEndIndex();
    });

    const apiDataStore = useApiDataStore();

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

    onMounted(async () => {
      const route = useRoute();
      const semester = route.params.semester;
      const year = route.params.year;

      if (semester && year) {
        resultTitle.value = `${year}學年第${semester}學期期中預警學生`;
      }
    });

    const apiData = computed(() => apiDataStore.getApiData);

    const goToPage = (page) => {
      if (page < 1 || page > totalPages.value) return;

      currentPage.value = page;
    };

    console.log("apiDataStore 中的資料：", apiDataStore.getApiData);

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

    // 編號
    const getSerialNumber = (index) => {
      return (currentPage.value - 1) * itemsPerPage.value + index + 1;
    };

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

    const filteredData = computed(() => {
      const regex = new RegExp(searchTerm.value.trim(), "i");
      return apiDataStore.getApiData.filter((item) => {
        // 检查每个字段是否包含搜索词
        return Object.values(item).some((value) => regex.test(value));
      });
    });

    function calculateStartAndEndIndex() {
      startIndex.value = (currentPage.value - 1) * itemsPerPage.value + 1;
      calculateEndIndex();
    }

    function calculateEndIndex() {
      console.log("totalItems:", totalItems.value);
      console.log("currentPage:", currentPage.value);
      console.log("itemsPerPage:", itemsPerPage.value);

      const startIdx = (currentPage.value - 1) * itemsPerPage.value + 1;
      const endIdx = currentPage.value * itemsPerPage.value;
      const endIndex = Math.min(endIdx, totalItems.value);

      console.log("endIndex:", endIndex);
      return endIndex;
    }

    async function handleSearch() {
      try {
        const searchData = await fetchSearchData();
        console.log("搜索结果长度：", searchData.length);
        totalItems.value = searchData.length;
        resetVariables(); // 重置变量
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
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const buttonPrint = ref(null);

    // 點擊列印按鈕時觸發的函式
    const handlePrint = () => {
      const selectedDataIndices = printSelection.value.reduce((acc, selected, index) => {
        if (selected) {
          acc.push(index); // 記錄被選取之資料Index
        }
        return acc;
      }, []);

      const selectedData = selectedDataIndices.map((index) => apiData.value[index]); // 取得被選取的資料

      // 列印被選取資料
      selectedData.forEach((data) => {
        console.log(formatData(data));
      });
    };

    // 将資料填入指定的格式中的函式
    const formatData = (data) => {
      // 將資料轉換為所需格式
      return `${data.name}: ${data.value}`;
    };

    const buttonSelectAll = () => {
      console.log("SelectAll");
      selectAll.value = true;
      printSelection.value = Array(apiData.value.length).fill(true);
      console.log(printSelection.value);
    };

    const buttonDeselect = () => {
      console.log("Deselect");
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
      isInputFocused,
      changePageSize,
      goToPage,
      getSerialNumber,
      prevPage,
      nextPage,
      startIndex,
      endIndex,
      handleSearch,
      buttonPrint,
      buttonSelectAll,
      buttonDeselect,
      filteredData,
      searchTerm,
      departmentName,
      teacherDepartment,
      studentState,
      formatDate,
    };
  },
};
</script>

<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (prefers-reduced-motion: no-preference) {
  :root {
    scroll-behavior: smooth;
  }
}
:root {
  --bs-blue: #0d6efd;
  --bs-indigo: #6610f2;
  --bs-purple: #6f42c1;
  --bs-pink: #d63384;
  --bs-red: #dc3545;
  --bs-orange: #fd7e14;
  --bs-yellow: #ffc107;
  --bs-green: #198754;
  --bs-teal: #20c997;
  --bs-cyan: #0dcaf0;
  --bs-white: #fff;
  --bs-gray: #6c757d;
  --bs-gray-dark: #343a40;
  --bs-primary: #0d6efd;
  --bs-secondary: #6c757d;
  --bs-success: #198754;
  --bs-info: #0dcaf0;
  --bs-warning: #ffc107;
  --bs-danger: #dc3545;
  --bs-light: #f8f9fa;
  --bs-dark: #212529;
  --bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
  --bs-gradient: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  );
}
*,
::after,
::before {
  box-sizing: border-box;
}
html[屬性樣式] {
  -webkit-locale: "en";
}
使用者代理程式樣式表 html {
  display: block;
}
*,
::after,
::before {
  box-sizing: border-box;
}
*,
::after,
::before {
  box-sizing: border-box;
}
.container {
  margin-top: 5.5%;
  margin-bottom: 7%;
}
.icon-address {
  font-size: 7px;
  position: fixed;
  top: 905px;
  left: 1838px;
}
.bd-callout-warning {
  --bd-callout-color: var(--bs-warning-text-emphasis);
  --bd-callout-bg: var(--bs-warning-bg-subtle);
  --bd-callout-border: var(--bs-warning-border-subtle);
}
.bd-callout {
  --bs-link-color-rgb: var(--bd-callout-link);
  --bs-code-color: var(--bd-callout-code-color);
  padding: 1.25rem;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  color: var(--bd-callout-color, inherit);
  background-color: var(--bd-callout-bg, var(--bs-gray-100));
  border-left: 0.25rem solid var(--bd-callout-border, var(--bs-gray-300));
}
.bold {
  font-size: 1.05rem;
  font-weight: bold;
}
td {
  font-size: 0.92rem;
  line-height: 1.5;
  vertical-align: middle;
}
.table th:first-child,
.table td:first-child {
  width: 10%;
}

.table th:nth-child(2),
.table td:nth-child(2) {
  width: 13%;
}

.table th:nth-child(3),
.table td:nth-child(3) {
  width: 30%;
}

.table th:nth-child(4),
.table td:nth-child(4) {
  width: 47%;
}
.std-state-text {
  color: #ff7809;
}
.credit-text {
  color: #d40000;
}
.etc-content-text {
  color: #808080;
}
.icon-address {
  font-size: 7px;
  position: fixed;
  top: 905px;
  left: 1820px;
}
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
/**/
.pagination-container .page-link[aria-label="Previous"],
.pagination-container .page-link[aria-label="Next"] {
  color: #4682b4;
  background-color: white;
  border-color: #ced4da;
}

.pagination-container .page-item .page-link {
  color: #4682b4;
  background-color: white;
  border-color: #ced4da;
}

.pagination-container .page-item.active .page-link {
  background-color: #4682b4;
  color: white;
  border-color: #ced4da;
}
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
.card {
  border: 0;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.5rem;
  margin-top: -3%;
}
.form-label.active {
  display: none;
  color: blue;
}

.pagination {
  display: flex;
  align-items: center;
}
.pagination select {
  margin: 0 5px;
  width: 5.5%;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 30px;
}
.pagination-button {
  border: none;
  background-color: transparent;
  font-size: 1.4rem;
}
.rows-per-page {
  font-size: 0.95rem;
  color: #343a40;
}
select {
  border: none;
  border-radius: 5px;
  background-color: transparent;
  min-height: auto;
  padding-top: 0.33em;
  padding-bottom: 0.33em;
  padding-left: 0.75em;
  padding-right: 0.75em;
  border: 0;
  transition: all 0.2s linear;
}
.btn-style {
  background-color: #4682b4;
  border-color: #ced4da;
  width: 150px;
}
.btn-style:hover {
  background-color: #0f4f85;
}
.btn-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.resultPage-btn {
  margin-left: auto;
}
.total-credit {
  line-height: 2.5;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
