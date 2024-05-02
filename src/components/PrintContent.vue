<template>
  <div>
    <div v-for="(data, index) in selectedDataArray" :key="index">
      <div class="print-content">
        <div class="section1">
          <div class="s1-1">
            <div class="some-content">
              <p><b>【 限時專送 】</b></p>
            </div>
            <div class="s1-address">
              <b
                ><p>
                  {{ data.warnings[0].address }}<br />
                  {{ data.warnings[0].parent }}&nbsp;先生/女士&nbsp;收
                </p></b
              >
            </div>
            <label class="s1-student">
              <span>{{ data.warnings[0].department }}</span
              >-<span>{{ data.warnings[0].degree }}</span
              >-<span>{{ data.warnings[0].studentClass }}</span
              >-<span>{{ data.studentId }}</span>
              <br />
              <span>{{ data.warnings[0].studentName }}</span>
              同學
            </label>
          </div>
        </div>
        <div class="section1-bottom-blank"></div>
        <div class="section2-std-data">
          <div class="s2-content">
            <div class="s2-text">
              <p>{{ data.warnings[0].parent }}家長，您好</p>
              <label>
                貴子弟本次期中考受預警科目如下，請多留意貴子弟在校的學習狀況：<br />
                <b>若有相關問題請與學系導師聯繫</b>。謝謝！
              </label>
              <br />
              <div class="some-content">
                <p>慈濟大學教務處註冊組&nbsp;敬啟</p>
              </div>
              <div class="header">
                <label>
                  <b
                    ><span>{{ inputAcademicYear }}</span
                    >學年度第<span>{{ inputSemester }}</span
                    >學期 期中考試預警通知</b
                  >
                </label>
              </div>
              <br />
              <div class="some-content">
                <label>列印日期：{{ currentDate }}</label
                ><br />
              </div>
            </div>
            <label class="s2-std-data">
              班級：<span>{{ departmentName[index] }}&nbsp;</span>
              <span>{{ data.warnings[0].degree }}</span
              >年<span>{{ data.warnings[0].studentClass }}</span
              >班<br />
              學號：<span>{{ data.studentId }}</span
              ><br />
              姓名：<span>{{ data.warnings[0].studentName }}</span>
            </label>
          </div>
        </div>
        <div class="section2-table">
          <div>
            <table class="course-table">
              <thead class="table-header">
                <th style="width: 80%"><b>課程名稱</b></th>
                <th style="width: 20%"><b>學分數</b></th>
              </thead>
              <tbody>
                <tr v-for="(warning, wIndex) in data.warnings" :key="wIndex">
                  <td style="padding-left: 7px">{{ warning.courseName }}</td>
                  <td class="s2-credit">{{ warning.credit }}學分</td>
                </tr>
                <tr>
                  <td colspan="2" style="text-align: right; padding-right: 7px">
                    <b style="display: block; text-align: right">
                      預警課程學分數合計：<span>{{
                        totalWarningCredits[data.studentId]
                      }}</span
                      >學分
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              <b
                >※&nbsp;本學期總修習學分數：<span>{{ data.warnings[0].totalCredit }}</span
                >學分</b
              >
            </p>
          </div>
        </div>
      </div>
      <div style="page-break-after: always"></div>
    </div>
  </div>
</template>

<script>
import { useApiDataStore } from "../store/apiDataStore";
import { ref, computed, onMounted, watch } from "vue";
import print from "vue3-print-nb";
import { deptName } from "../components/TransformData.js";

export default {
  name: "Print",
  directives: { print },
  props: {
    selectedDataArray: Array,
    departmentName: Array,
    currentDate: String,
  },
  setup(props) {
    const apiDataStore = useApiDataStore();
    const currentDate = ref("");
    const selectedData = computed(() => apiDataStore.selectedData);
    const selectedDataArray = computed(() => {
      return apiDataStore.getSelectedData;
    });
    const apiData = computed(() => apiDataStore.getApiData);
    const inputAcademicYear = computed(() => apiData.value.inputAcademicYear);
    const inputSemester = computed(() => apiData.value.inputSemester);
    const printedCounts = {};
    const printInProgress = ref(false);

    const updateCurrentDate = () => {
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${now
        .getDate()
        .toString()
        .padStart(2, "0")} ${now
        .getHours()
        .toString()
        .padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      currentDate.value = formattedDate;
    };

    watch(currentDate, () => {
      window.print();
    });

    window.onbeforeprint = () => {
      printInProgress.value = true;
    };

    window.onafterprint = () => {
      if (printInProgress.value) {
        history.back();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      printInProgress.value = false;
    };

    updateCurrentDate();

    const departmentName = computed(() => {
      if (!selectedDataArray.value.length) return [];

      const result = [];
      for (const item of selectedDataArray.value) {
        const warnings = item.warnings || [];
        for (const warning of warnings) {
          if (warning.department && deptName.hasOwnProperty(warning.department)) {
            result.push(deptName[warning.department].trim());
            break;
          }
        }
      }
      return result;
    });

    function shouldDisplayWarning(data, index) {
      const studentId = data.studentId;
      printedCounts[studentId] = printedCounts[studentId] || 0;

      if (printedCounts[studentId] > 0) {
        return false;
      }

      printedCounts[studentId]++;
      return true;
    }

    const totalWarningCredits = computed(() => {
      const totalCredits = {};
      selectedDataArray.value.forEach((data) => {
        let studentId = data.studentId;
        let totalCredit = 0;
        data.warnings.forEach((warning) => {
          totalCredit += warning.credit;
        });
        totalCredits[studentId] = totalCredit;
      });
      return totalCredits;
    });

    return {
      shouldDisplayWarning,
      currentDate,
      departmentName,
      selectedDataArray,
      selectedData,
      inputAcademicYear,
      inputSemester,
      totalWarningCredits,
    };
  },
};
</script>

<style scoped>
@import "../style/PrintContentStyle.css";
</style>
