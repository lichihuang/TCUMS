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
          <h3 class="search-page-title">期中預警通知列印</h3>
          <hr />
        </div>

        <div class="row g-3 search-form">
          <div class="col-md-8 col-lg-8">
            <form class="needs-validation col-sm-12" novalidate="">
              <div class="row g-3">
                <div class="col-sm-6">
                  <label for="firstName" class="form-label"
                    >&nbsp;➢&nbsp;<font class="required">*</font>&nbsp;預警課程數&nbsp;≥
                  </label>
                  <input
                    type="text"
                    v-model="inputEarlyWarningCourses"
                    @input="inputEarlyWarningCourses = $event.target.value"
                    class="form-control"
                    id="EarlyWarningCourses"
                    placeholder="單一學生有幾門課程被預警"
                    value=""
                    required=""
                  />
                  <div class="invalid-feedback">Valid first name is required.</div>
                </div>

                <div class="col-sm-6">
                  <label for="lastName" class="form-label"
                    >&nbsp;➢&nbsp;<font class="required">*</font
                    >&nbsp;或預警必修課程數</label
                  >
                  <input
                    type="text"
                    v-model="inputEarlyWarningRequiredCourses"
                    @input="inputEarlyWarningRequiredCourses = $event.target.value"
                    class="form-control"
                    id="EarlyWarningRequiredCourses"
                    placeholder="必修課指選課檔別為必修之課程"
                    value=""
                    required=""
                  />
                  <div class="invalid-feedback">Valid last name is required.</div>
                </div>

                <div class="col-4">
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

                <div class="col-5">
                  <label for="address" class="form-label"
                    >&nbsp;➢&nbsp;<font class="required">*</font>&nbsp;期中預警學期</label
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

                <div class="col-3">
                  <label></label>
                  <div class="form-check">
                    <input
                      v-model="inputSemester"
                      id="FirstSemester"
                      name="ChooseSemester"
                      type="radio"
                      class="form-check-input"
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
                <div class="row">
                  <div class="col-12 col-md-4 btn-box">
                    <button
                      @click="buttonSearch"
                      class="btn-style w-100 btn btn-primary btn-md"
                      type="submit"
                    >
                      查詢
                    </button>
                  </div>
                  <div class="col-12 col-md-4 btn-box">
                    <button
                      @click="buttonToExcel"
                      class="btn-style w-100 btn btn-primary btn-md"
                      type="button"
                    >
                      匯出Excel
                    </button>
                  </div>
                  <div class="col-12 col-md-4 btn-box">
                    <button
                      @click="buttonClear"
                      class="btn-style w-100 btn btn-primary btn-md"
                      type="button"
                    >
                      清除
                    </button>
                  </div>
                </div>
              </div>

              <hr class="my-4" />
              <div class="bd-callout bd-callout-warning">
                <div class="row">
                  <div class="col-md-6">
                    <label class="instructions-header">☞&nbsp;&nbsp;列印說明</label>
                  </div>
                  <div class="col-md-12">
                    <div class="list-content-unstyled">
                      <ol class="instructions-table">
                        <li>
                          系統將列印出指定之期中預警及課程數學生名單，供使用者選擇確定列印範圍
                        </li>
                        <li>
                          列印注意事項：
                          <table class="attention-table">
                            <tr>
                              <td>▪&nbsp;&nbsp;Chrome：</td>
                            </tr>
                            <tr>
                              <td>
                                <ol>
                                  <li>
                                    設定目的地：列印&nbsp;⭢&nbsp;選擇印表機；下載PDF&nbsp;⭢&nbsp;另存為PDF。
                                  </li>
                                  <li>
                                    點選「顯示更多設定」：紙張大小設為&nbsp;<b>A4</b>，邊界及縮放比例皆設為<b>預設</b>。
                                  </li>
                                </ol>
                              </td>
                            </tr>
                            <tr>
                              <td>▪&nbsp;&nbsp;Edge：</td>
                            </tr>
                            <tr>
                              <td>
                                <ol>
                                  <li>
                                    設定印表機：列印&nbsp;⭢&nbsp;選擇印表機；下載PDF&nbsp;⭢&nbsp;另存新檔為PDF。
                                  </li>
                                  <li>
                                    點選「其他設定」：紙張大小設為&nbsp;<b>A4</b>，比例設為<b>實際大小</b>，邊界設為<b>預設值</b>。
                                  </li>
                                </ol>
                              </td>
                            </tr>
                          </table>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
    <div
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      ref="toastRef"
    >
      <div class="toast-body">
        「預警課程數&nbsp;/&nbsp;預警必修課程數」至少填寫一項
        <div class="mt-2 pt-2 border-top">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="toast">
            OK
          </button>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <p class="mb-0">
        CopyRight © 2024 -
        <a href="index.html">Tzu Chi University Computer Center, All Right Reserved</a>.
      </p>
    </div>
    <a href="https://lordicon.com/" class="icon-address">Icons by Lordicon.com</a>
  </body>
</template>

<script>
import { ref, computed, watchEffect, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import ExcelJS from "exceljs";
import axios from "axios";
import { useApiDataStore } from "../store/apiDataStore";
import sweetAlert from "../components/sweetAlert";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { deptName, stdState } from "../components/TransformData.js";

export default {
  name: "Search",
  components: {},
  setup() {
    const router = useRouter();

    const inputEarlyWarningCourses = ref("");
    const inputEarlyWarningRequiredCourses = ref("");
    const inputStudentID = ref("");
    const inputAcademicYear = ref("");
    const inputSemester = ref("");
    const selectedCollege = ref("");
    const selectedDepartment = ref("");
    const semesterWarnings = ref([]);
    const apiDataStore = useApiDataStore();

    const collegeDepartments = {
      醫學院: [
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
        "傳播學系",
        "兒童發展與家庭教育學系",
        "傳播學系碩士班 ",
        "教育研究所",
      ],
      人文社會學院: [
        "東方語文學系中文組",
        "東方語文學系日文組",
        "社會工作學系",
        "人類發展與心理學系",
        "人類發展與心理學系碩士班",
        "東方語文學系碩士班",
        "宗教與人文研究所",
      ],
      國際暨跨領域學院: [
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

    // 搜尋
    const buttonSearch = async (event) => {
      event.preventDefault();

      let errorMessages = "";

      if (
        !inputEarlyWarningCourses.value.trim() &&
        !inputEarlyWarningRequiredCourses.value.trim()
      ) {
        errorMessages += "預警課程及預警必修課程請至少填寫一項\n";
      }
      if (!inputAcademicYear.value.trim()) {
        if (inputSemester.value !== "1" && inputSemester.value !== "2") {
          errorMessages += "/ 請輸入學年及學期\n";
        } else {
          errorMessages += "/ 請輸入學年\n";
        }
      } else if (inputSemester.value !== "1" && inputSemester.value !== "2") {
        errorMessages += "/ 請選填學期\n" + "\n";
      }
      if (selectedCollege.value.trim()) {
        if (!selectedDepartment.value.trim()) {
          errorMessages += "/ 請選填科系\n" + "\n";
        }
      }

      if (errorMessages) {
        sweetAlert.typicalType("注意", errorMessages, "warning", `OK`);
      } else {
        const requestData = {
          w_smtr: inputAcademicYear.value + inputSemester.value,
          w_dept_no: selectedDepartment.value,
        };
        // 檢查選填
        if (inputStudentID.value.trim()) {
          requestData.w_std_no = inputStudentID.value.trim();
        }
        if (inputEarlyWarningCourses.value.trim()) {
          requestData.w_course = inputEarlyWarningCourses.value.trim();
        }
        if (inputEarlyWarningRequiredCourses.value.trim()) {
          requestData.w_required_course = inputEarlyWarningRequiredCourses.value.trim();
        }
        if (selectedDepartment.value.trim()) {
          const departmentName = selectedDepartment.value.trim();
          const departmentCode = Object.keys(deptName).find(
            (key) => deptName[key] === departmentName
          );
          if (departmentCode) {
            requestData.w_dept = departmentCode;
          } else {
            console.error("無法找到對應的科系代號");
          }
        }

        try {
          const response = await axios.post(
            "http://localhost:5256/api/SemesterWarning/Combined",
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
              response.data.inputAcademicYear = inputAcademicYear.value;
              response.data.inputSemester = inputSemester.value;
              apiDataStore.setApiData(response.data);
              await router.push({ name: "ResultMain" });
            } else {
              sweetAlert.typicalType("發生錯誤", "無相符資料", "error", `OK`);
            }
          } else {
            console.error("API 請求失敗:", response.statusText);
            sweetAlert.typicalType("發生錯誤", "搜尋失敗，請稍後再試", "error", `OK`);
          }
        } catch (error) {
          console.error("Error during API request:", error);
          sweetAlert.typicalType("發生錯誤", "搜尋失敗，請稍後再試", "error", `OK`);
        }
      }
    };

    // 匯出 Excel
    const buttonToExcel = async (event) => {
      event.preventDefault();

      let errorMessages = "";

      if (
        !inputEarlyWarningCourses.value.trim() &&
        !inputEarlyWarningRequiredCourses.value.trim()
      ) {
        errorMessages += "預警課程及預警必修課程請至少填寫一項\n";
      }
      if (!inputAcademicYear.value.trim()) {
        if (inputSemester.value !== "1" && inputSemester.value !== "2") {
          errorMessages += "/ 請輸入學年及學期\n";
        } else {
          errorMessages += "/ 請輸入學年\n";
        }
      } else if (inputSemester.value !== "1" && inputSemester.value !== "2") {
        errorMessages += "/ 請選填學期\n" + "\n";
      }
      if (selectedCollege.value.trim()) {
        if (!selectedDepartment.value.trim()) {
          errorMessages += "/ 請選填科系\n" + "\n";
        }
      }

      if (errorMessages) {
        sweetAlert.typicalType("注意", errorMessages, "warning", `OK`);
      } else {
        const requestData = {
          w_smtr: inputAcademicYear.value + inputSemester.value,
          w_dept_no: selectedDepartment.value,
        };
        // 檢查選填
        if (inputStudentID.value.trim()) {
          requestData.w_std_no = inputStudentID.value.trim();
        }
        if (inputEarlyWarningCourses.value.trim()) {
          requestData.w_course = inputEarlyWarningCourses.value.trim();
        }
        if (inputEarlyWarningRequiredCourses.value.trim()) {
          requestData.w_required_course = inputEarlyWarningRequiredCourses.value.trim();
        }
        if (selectedDepartment.value.trim()) {
          requestData.w_dept = selectedDepartment.value.trim();
        }

        try {
          const response = await axios.post(
            "http://localhost:5256/api/SemesterWarning/Combined",
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
              response.data.inputAcademicYear = inputAcademicYear.value;
              response.data.inputSemester = inputSemester.value;
              apiDataStore.setApiData(response.data);
              createExcelFromData(response.data);
            } else {
              sweetAlert.typicalType("發生錯誤", "無相符資料", "error", `OK`);
            }
          } else {
            sweetAlert.typicalType("發生錯誤", "搜尋失敗，請稍後再試", "error", `OK`);
          }
        } catch (error) {
          sweetAlert.typicalType("發生錯誤", "搜尋失敗，請稍後再試", "error", `OK`);
        }
      }
    };

    // Excel檔
    const createExcelFromData = (data) => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sheet 1");

      const mergedCell1 = worksheet.getCell("A1:Q1");
      mergedCell1.value = `【 ${inputAcademicYear.value} 學年第 ${inputSemester.value} 學期其中預警學生名單 】`;
      mergedCell1.alignment = { vertical: "middle", horizontal: "left" };
      mergedCell1.font = { bold: true };
      worksheet.mergeCells("A1:P1");
      worksheet.getRow(1).height = 20;
      worksheet.getRow(1).alignment = { vertical: "middle" };

      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

      const mergedCell2 = worksheet.getCell("A2:Q2");
      mergedCell2.value = ` 資料時間：${formattedDate}`;
      mergedCell2.alignment = { vertical: "middle", horizontal: "left" };
      mergedCell2.font = { bold: true };
      worksheet.mergeCells("A2:P2");
      worksheet.getRow(2).height = 20;
      worksheet.getRow(2).alignment = { vertical: "middle" };

      // Excel 檔案格式設定
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
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF2CC" },
        };
      });

      data.forEach((rowData) => {
        rowData.warnings.forEach((warning) => {
          const row = worksheet.addRow([
            warning.advisor,
            warning.department,
            warning.degree,
            warning.studentClass,
            rowData.studentId,
            warning.studentName,
            warning.courseId,
            warning.class,
            warning.courseName,
            warning.credit,
            warning.teacher,
            warning.cos_year,
            warning.teacherDept,
            warning.courseType,
            warning.memo,
            warning.insTime,
          ]);

          row.height = 20;
          row.eachCell((cell) => {
            cell.alignment = { vertical: "middle" };
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          });
        });
      });

      worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
        row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
          if (rowNumber <= 2) {
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          } else {
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          }
        });
      });

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

      selectedCollege.value = "";
      selectedDepartment.value = "";
      inputEarlyWarningCourses.value = "";
      inputEarlyWarningRequiredCourses.value = "";
      inputAcademicYear.value = "";
      inputSemester.value = "";
      inputStudentID.value = "";
    };

    // 從 sessionStorage 載資料
    const loadFormData = () => {
      const formData = JSON.parse(sessionStorage.getItem("formData"));
      if (formData) {
        inputEarlyWarningCourses.value = formData.inputEarlyWarningCourses;
        inputEarlyWarningRequiredCourses.value =
          formData.inputEarlyWarningRequiredCourses;
        inputStudentID.value = formData.inputStudentID;
        inputAcademicYear.value = formData.inputAcademicYear;
        inputSemester.value = formData.inputSemester;
        selectedCollege.value = formData.selectedCollege;
        selectedDepartment.value = formData.selectedDepartment;
      }
    };

    // 將資料儲存到 sessionStorage
    const saveFormData = () => {
      const formData = {
        inputEarlyWarningCourses: inputEarlyWarningCourses.value,
        inputEarlyWarningRequiredCourses: inputEarlyWarningRequiredCourses.value,
        inputStudentID: inputStudentID.value,
        inputAcademicYear: inputAcademicYear.value,
        inputSemester: inputSemester.value,
        selectedCollege: selectedCollege.value,
        selectedDepartment: selectedDepartment.value,
      };
      sessionStorage.setItem("formData", JSON.stringify(formData));
    };

    // 在組件掛載時加載資料，組件卸載時保存資料
    onMounted(loadFormData);
    onBeforeUnmount(saveFormData);

    // 頁面刷新時清除 sessionStorage 資料
    window.addEventListener("beforeunload", () => {
      sessionStorage.removeItem("formData");
    });

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
@import "../style/SearchStyle.css";
</style>
