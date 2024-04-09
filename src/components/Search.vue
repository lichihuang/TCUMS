<template>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="" />
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors" />
    <meta name="generator" content="Hugo 0.79.0" />

    <meta name="theme-color" content="#7952b3" />
    <link href="form-validation.css" rel="stylesheet" />
  </head>
  <body class="bg-light">
    <div class="container col-md-12 col-lg-12">
      <main>
        <div class="py-5 text-center">
          <h3>期中預警通知列印</h3>
          <hr />
        </div>

        <div class="row g-3 search-form">
          <div class="col-md-8 col-lg-8">
            <form class="needs-validation col-sm-12" novalidate="">
              <div class="row g-3">
                <div class="col-sm-6">
                  <label for="firstName" class="form-label"
                    >&nbsp;➢&nbsp;預警課程數&nbsp;(&nbsp;即單一學生有幾門課程被預警&nbsp;)&nbsp;≥</label
                  >
                  <input
                    type="text"
                    v-model="inputEarlyWarningCourses"
                    @input="inputEarlyWarningCourses = $event.target.value"
                    class="form-control"
                    id="EarlyWarningCourses"
                    placeholder=""
                    value=""
                    required=""
                  />
                  <div class="invalid-feedback">Valid first name is required.</div>
                </div>

                <div class="col-sm-6">
                  <label for="lastName" class="form-label"
                    >&nbsp;➢&nbsp;或預警必修課程數&nbsp;(&nbsp;必修課指選課檔別為必修之課程&nbsp;)</label
                  >
                  <input
                    type="text"
                    v-model="inputEarlyWarningRequiredCourses"
                    @input="inputEarlyWarningRequiredCourses = $event.target.value"
                    class="form-control"
                    id="EarlyWarningRequiredCourses"
                    placeholder=""
                    value=""
                    required=""
                  />
                  <div class="invalid-feedback">Valid last name is required.</div>
                </div>

                <div class="col-6">
                  <label for="address" class="form-label">&nbsp;➢&nbsp;學號</label>
                  <input
                    type="text"
                    v-model="inputStudentID"
                    class="form-control"
                    id="studentID"
                    placeholder=""
                    required=""
                  />
                  <div class="invalid-feedback">Please enter your shipping address.</div>
                </div>

                <div class="col-4">
                  <label for="address" class="form-label"
                    >&nbsp;➢&nbsp;期中預警之學期</label
                  >
                  <input
                    type="text"
                    v-model="inputAcademicYear"
                    @input="inputAcademicYear = $event.target.value"
                    class="form-control"
                    id="AcademicYear"
                    placeholder="請輸入學年"
                    required=""
                  />
                  <div class="invalid-feedback">Please enter your shipping address.</div>
                </div>

                <div class="col-2">
                  <label></label>
                  <div class="form-check">
                    <input
                      v-model="inputSemester"
                      id="FirstSemester"
                      name="ChooseSemester"
                      type="radio"
                      class="form-check-input"
                      checked=""
                      required=""
                      value="1"
                    />
                    <label class="form-check-label" for="FirstSemester"
                      >&nbsp;上學期</label
                    >
                  </div>
                  <div class="form-check">
                    <input
                      v-model="inputSemester"
                      id="SecondSemester"
                      name="ChooseSemester"
                      type="radio"
                      class="form-check-input"
                      checked=""
                      required=""
                      value="2"
                    />
                    <label class="form-check-label" for="SecondSemester"
                      >&nbsp;下學期</label
                    >
                  </div>
                </div>

                <div class="col-6">
                  <label for="country" class="form-label">&nbsp;➢&nbsp;院所</label>
                  <select
                    v-model="selectedCollege"
                    class="form-select"
                    id="country"
                    required=""
                  >
                    <option value="">請選擇院所 ...</option>
                    <option value="醫學院">醫學院</option>
                    <option value="教育傳播學院">教育傳播學院</option>
                    <option value="人文社會學院">人文社會學院</option>
                    <option value="國際暨跨領域學院">國際暨跨領域學院</option>
                  </select>
                  <div class="invalid-feedback">Please select a valid country.</div>
                </div>

                <div class="col-6">
                  <label for="state" class="form-label">&nbsp;➢&nbsp;科系</label>
                  <select
                    v-model="selectedDepartment"
                    class="form-select"
                    id="state"
                    required=""
                  >
                    <option value="">請選擇科系 ...</option>
                    <option v-for="department in getDepartments" :key="department">
                      {{ department }}
                    </option>
                  </select>
                  <div class="invalid-feedback">Please provide a valid state.</div>
                </div>
                <div class="col-12 btn-box"></div>
                <div class="col-3 btn-box"></div>
                <div class="col-2 btn-box">
                  <button
                    @click="buttonSearch"
                    class="btn-style w-10 btn btn-primary btn-md"
                    type="submit"
                  >
                    查詢
                  </button>
                </div>
                <div class="col-2 btn-box">
                  <button
                    @click="buttonToExcel"
                    class="btn-style w-10 btn btn-primary btn-md"
                    type="button"
                  >
                    匯出Excel
                  </button>
                </div>
                <div class="col-2 btn-box">
                  <button
                    @click="buttonClear"
                    class="btn-style w-10 btn btn-primary btn-md"
                    type="button"
                  >
                    清除
                  </button>
                </div>
                <div class="col-3 btn-box"></div>
              </div>

              <hr class="my-4" />
              <div class="bd-callout bd-callout-warning">
                <div class="row">
                  <div class="col-md-2">
                    <h5 class="h5 mb-4">&nbsp;&nbsp;列印說明</h5>
                  </div>
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-12 col-sm-12">
                        <ul class="list-unstyled">
                          <li>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(1)&nbsp;系統將列印出指定之期中預警及課程數學生名單，供使用者選擇確定列印範圍
                          </li>
                          <li>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2)&nbsp;列印注意事項：
                            <ul class="list-content-unstyled">
                              <li>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▪&nbsp;&nbsp;&nbsp;&nbsp;IE的檔案：設定列印格式，將頁首、頁尾值清空，設為A4直印，同時上下左右邊界設定為10。
                              </li>
                              <li>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▪&nbsp;&nbsp;&nbsp;&nbsp;IE的工具：網際網路選項-進階-列印，勾選列印背景的彩色及影像。
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>

    <CopyrightNotice />
    <a href="https://lordicon.com/" class="icon-address">Icons by Lordicon.com</a>
  </body>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import ExcelJS from "exceljs";
import CopyrightNotice from "../components/CopyrightNotice.vue";
import axios from "axios";
import { createStore } from "../store/pinia";
import { useApiDataStore } from "../store/apiDataStore";

export default {
  name: "Search",
  components: {
    CopyrightNotice,
  },
  setup() {
    const router = useRouter();

    const selectedCollege = ref("");
    const selectedDepartment = ref("");
    const inputEarlyWarningCourses = ref("");
    const inputEarlyWarningRequiredCourses = ref("");
    const inputAcademicYear = ref("");
    const inputSemester = ref("");
    const inputStudentID = ref("");

    const semesterWarnings = ref([]); // 取到的Data

    const apiDataStore = useApiDataStore();

    const store = createStore({
      state: () => ({
        apiData: [], // 儲存API數據狀態
      }),

      actions: {
        setApiData(data) {
          this.apiData = data;
        },
      },

      getters: {
        getApiData() {
          return this.apiData;
        },
      },
    });

    const collegeDepartments = {
      醫學院: [
        // 大學部
        "醫學系",
        "藥學系",
        "護理學系",
        "學士後護理學系",
        "公共衛生學系",
        "醫學檢驗生物技術學系",
        "醫學資訊學系",
        "物理治療學系",
        "學士後中醫學系",
        "生物醫學暨工程學系",
        "分子生物暨人類遺傳學系",
        "醫學影像暨放射科學系",
        // 研究所
        "醫學科學研究所(博)",
        "轉譯醫學博士學位學程",
        "護理學系碩士班",
        "公共衛生學系碩士班",
        "醫學資訊學系碩士班",
        "醫學檢驗生物技術學系醫學生物技術碩士班",
        "物理治療學系碩士班",
        "學士後中醫學系碩士班",
        "生物醫學暨工程學系碩士班",
        "醫學系藥理暨毒理學碩士班",
        "醫學系藥理暨毒理學博士班",
        "臨床藥學研究所",
        "醫學系生物醫學碩士班",
        "分子生物暨人類遺傳學系碩士班",
        "生物醫學全英語學分學程",
      ],
      教育傳播學院: [
        // 大學部
        "傳播學系",
        "兒童發展與家庭教育學系",
        // 碩士班
        "傳播學系碩士班 ",
        "教育研究所",
      ],
      人文社會學院: [
        // 大學部
        "東方語文學系中文組",
        "東方語文學系日文組",
        "社會工作學系",
        "人類發展與心理學系",
        // 碩士班
        "人類發展與心理學系碩士班",
        "東方語文學系碩士班",
        "宗教與人文研究所",
      ],
      國際暨跨領域學院: [
        // 大學部
        "外國語文學系",
        "國際服務產業管理學士學位學程",
        "國際數位媒體科技學士學位學程",
        "永續暨防災碩士學位學程",
      ],
    };

    const getDepartments = computed(
      () => collegeDepartments[selectedCollege.value] || []
    );

    watchEffect(() => {
      console.log(selectedDepartment.value);
    });

    const buttonSearch = async (event) => {
      event.preventDefault();

      let errorMessages = "";

      if (!inputAcademicYear.value.trim()) {
        if (inputSemester.value !== "1" && inputSemester.value !== "2") {
          errorMessages += "請輸入學年及學期\n";
        } else {
          errorMessages += "請輸入學年\n";
        }
      } else if (inputSemester.value !== "1" && inputSemester.value !== "2") {
        errorMessages += "請選填學期\n";
      }

      if (errorMessages) {
        alert(errorMessages);
      } else {
        const requestData = {
          w_smtr: inputAcademicYear.value + inputSemester.value,
          w_dept_no: selectedDepartment.value,
          w_std_no: inputStudentID.value.trim(),
        };

        try {
          const response = await axios.post(
            "http://localhost:5256/api/SemesterWarning/Combined", // 修改為正確的端點 URL
            requestData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("API 回應：", response);

          if (response && response.status === 200) {
            if (response.data && response.data.length > 0) {
              console.log("相符資料：", response.data);
              apiDataStore.setApiData(response.data);
              await router.push({ name: "ResultMain" });
            } else {
              console.log("無相符資料");
              alert("無相符資料");
            }
          } else {
            console.error("API 請求失敗:", response.statusText);
            alert("搜尋失敗，請稍後再試。");
          }
        } catch (error) {
          console.error("Error during API request:", error);
          alert("搜尋失敗，請稍後再試。");
        }
      }
    };

    const buttonToExcel = async (event) => {
      event.preventDefault();

      let errorMessages = "";

      if (!inputAcademicYear.value.trim()) {
        if (inputSemester.value !== "1" && inputSemester.value !== "2") {
          errorMessages += "請輸入學年及學期\n";
        } else {
          errorMessages += "請輸入學年\n";
        }
      } else if (inputSemester.value !== "1" && inputSemester.value !== "2") {
        errorMessages += "請選填學期\n";
      }

      if (errorMessages) {
        alert(errorMessages);
      } else {
        const requestData = {
          w_smtr: inputAcademicYear.value + inputSemester.value,
          w_dept_no: selectedDepartment.value,
          w_std_no: inputStudentID.value.trim(),
        };

        try {
          const response = await axios.post(
            "http://localhost:5256/api/SemesterWarning/Search",
            requestData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("API 回應：", response);

          if (response && response.status === 200) {
            if (response.data && response.data.length > 0) {
              console.log("相符資料：", response.data);
              apiDataStore.setApiData(response.data);
              // 呼叫函數 createExcelFromData 來生成 Excel
              createExcelFromData(response.data);
            } else {
              console.log("無相符資料");
              alert("無相符資料");
            }
          } else {
            console.error("API 請求失敗:", response.statusText);
            alert("搜尋失敗，請稍後再試。");
          }
        } catch (error) {
          console.error("Error during API request:", error);
          alert("搜尋失敗，請稍後再試。");
        }
      }
    };

    const createExcelFromData = (data) => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sheet 1");

      // 設置第一行文字為粗體且行高為20
      const mergedCell1 = worksheet.getCell("A1:Q1");
      mergedCell1.value = `【 ${inputAcademicYear.value} 學年第 ${inputSemester.value} 學期其中預警學生名單 】`;
      mergedCell1.alignment = { vertical: "middle", horizontal: "left" };
      mergedCell1.font = { bold: true }; // 設置粗體
      worksheet.mergeCells("A1:P1");
      worksheet.getRow(1).height = 20; // 設置行高為20
      worksheet.getRow(1).alignment = { vertical: "middle" /* , horizontal: "center" */ }; // 垂直置中

      // 添加第二行且行高為20
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

      const mergedCell2 = worksheet.getCell("A2:Q2");
      mergedCell2.value = ` 資料時間：${formattedDate}`;
      mergedCell2.alignment = { vertical: "middle", horizontal: "left" }; // 將水平對齊方式設置為 "left"
      mergedCell2.font = { bold: true }; // 設置粗體
      worksheet.mergeCells("A2:P2");
      worksheet.getRow(2).height = 20; // 設置行高為20
      worksheet.getRow(2).alignment = { vertical: "middle" /* , horizontal: "center" */ }; // 垂直置中

      // 添加表頭
      const headerRow = worksheet.addRow([
        "導師姓名",
        "系所",
        "年級",
        "班別",
        "學號",
        "姓名",
        "開課課程 - 課號",
        "開課課程 - 班別",
        "開課課程 - 名稱",
        "開課課程 - 學分數",
        "開課教師",
        "開課年級",
        "教師所屬系所",
        "必選修",
        "期中預警備註說明",
        "開課教師登錄日期",
      ]);

      headerRow.height = 20;
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { vertical: "middle", horizontal: "center" }; // 垂直置中
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF2CC" }, // 背景填滿色為#FFF2CC
        };
      });

      // 添加資料行
      data.forEach((rowData) => {
        const row = worksheet.addRow([
          rowData.advisor,
          rowData.w_dept_no,
          rowData.w_degree,
          rowData.w_class,
          rowData.w_std_no,
          rowData.chi_name,
          rowData.w_cos_id,
          rowData.w_cos_class,
          rowData.cos_cname,
          rowData.cos_credit,
          rowData.teacher_name,
          rowData.cos_year,
          rowData.tch_dept_no,
          rowData.cos_type,
          rowData.w_memo,
          /* rowData.ins_user, */
          rowData.ins_time,
          /* rowData.print_time,
          rowData.address,
          rowData.parent, */
        ]);

        row.height = 20;
        row.eachCell((cell) => {
          cell.alignment = { vertical: "middle" }; // 垂直置中
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      });
      worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
        row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
          if (rowNumber <= 2) {
            // 第一、第二行
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          } else {
            // 資料行
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          }
        });
      });

      // 生成 Excel 文件
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "export.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    };

    const buttonClear = async (event) => {
      event.preventDefault();
      console.log("Clear！");

      selectedCollege.value = "";
      selectedDepartment.value = "";
      inputEarlyWarningCourses.value = "";
      inputEarlyWarningRequiredCourses.value = "";
      inputAcademicYear.value = "";
      inputSemester.value = "";
      inputStudentID.value = "";
    };

    return {
      selectedCollege,
      selectedDepartment,
      inputEarlyWarningCourses,
      inputEarlyWarningRequiredCourses,
      inputAcademicYear,
      inputSemester,
      inputStudentID,
      getDepartments,
      buttonSearch,
      buttonClear,
      buttonToExcel,
      semesterWarnings,
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
.search-form {
  display: flex;
  justify-content: center;
  align-items: center;
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
.icon-address {
  font-size: 7px;
  position: fixed;
  top: 905px;
  left: 1820px;
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
.list-unstyled {
  text-align: left;
  line-height: 1.5;
  font-size: 1rem;
  line-height: 1.8;
}
.list-content-unstyled {
  list-style-type: none;
  text-align: left;
  line-height: 1.8;
  margin-left: -2%;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
