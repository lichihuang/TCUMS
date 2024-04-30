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
        //history.back();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      printInProgress.value = false;
    };

    updateCurrentDate();

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
      "": "未知科系",
    };

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
body {
  font-family: "標楷體", "Microsoft JhengHei", sans-serif;
}
.print-content {
  @page {
    size: A4;
  }
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: "標楷體", "Microsoft JhengHei", sans-serif;
}
table {
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid black;
  vertical-align: middle;
}

@page {
  margin-bottom: 0mm;
  margin-top: 0mm;
}

@media print {
  .print-content {
    width: 100%;
    height: 29.7cm;
    margin: 0 auto;
    background-color: white;
  }
  @page {
    size: A4;
    margin-right: 1.5cm;
    margin-left: 1.5cm;
  }
}

@media screen {
  .print-content {
    width: 21cm;
    height: 29.7cm;
    margin: 0 auto;
    background-color: white;
  }
}

.section1 {
  width: 100%;
  height: 8.5cm;
  /* border-bottom: 1px dashed black; */
  padding-bottom: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.section2-std-data {
  width: 100%;
  height: 9.9cm;
  margin-top: 9%;
}
.section1-bottom-blank {
  width: 100%;
  height: 1.4cm;
}
.section2-table {
  width: 100%;
  height: 9.9cm;
}

.s2-content {
  margin-top: 65px;
  line-height: 1.2;
}
.some-content {
  text-align: right;
  margin-right: 0px;
}
.table-header {
  text-align: center;
}
.header {
  text-align: center;
  /* justify-content: center;
  align-items: center; */
}
.course-table {
  width: 100%;
  margin-top: 9.5px;
  line-height: 21px;
}
.section2-table {
  margin-top: -30px;
}
.s1-std {
  align-self: flex-end;
  text-align: right;
  color: rgb(160, 160, 160);
}
.s1-address {
  text-align: center;
}
.s1-1 {
  width: 100%;
  height: 8.5cm;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.s1-student {
  line-height: 1.2;
  text-align: right;
}
.s2-credit {
  text-align: center;
}
</style>
