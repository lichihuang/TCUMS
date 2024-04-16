<template>
  <div class="printContent">
    <div class="section1">
      <p>【 限時專送 】</p>
      <p v-if="selectedData && selectedData.address">{{ selectedData.address }}</p>
      <p v-if="selectedData && selectedData.parent">{{ selectedData.parent }}</p>
      <p>
        <span v-if="selectedData && selectedData.department">{{
          selectedData.department
        }}</span
        >&nbsp;-&nbsp;<span v-if="selectedData && selectedData.degree">{{
          selectedData.degree
        }}</span
        >&nbsp;-&nbsp;<span v-if="selectedData && selectedData.studentClass">{{
          selectedData.studentClass
        }}</span
        >&nbsp;-&nbsp;<span v-if="selectedData && selectedData.studentId">{{
          selectedData.studentId
        }}</span
        ><br /><span v-if="selectedData && electedData.studentName">{{
          selectedData.studentName
        }}</span
        >&nbsp;同學
      </p>
    </div>
    <div class="section2">
      <div>
        <p v-if="selectedData && selectedData.parent">
          {{ selectedData.parent }}家長，您好
        </p>
        <p>
          貴子弟本次期中考受預警科目如下，請多留意貴子弟在校的學習狀況：<br />
          <b>若有相關問題請與學系導師聯繫</b>。謝謝！
        </p>
        <p>慈濟大學教務處註冊組&nbsp;&nbsp;敬啟</p>
      </div>
      <div>
        <p>
          <b
            ><span v-if="selectedData && selectedData.inputAcademicYear">{{
              selectedData.inputAcademicYear
            }}</span
            >學年度第<span v-if="selectedData && selectedData.inputSemester">{{
              selectedData.inputSemester
            }}</span
            >學期期中考試預警通知</b
          >
        </p>
        <p>列印日期：{{ currentDate }}</p>
        <p>
          班級：<span v-if="selectedData && selectedData.department">{{
            departmentName
          }}</span
          ><span v-if="selectedData && selectedData.degree">{{
            selectedData.degree
          }}</span
          >年<span v-if="selectedData && selectedData.studentClass">{{
            selectedData.studentClass
          }}</span
          >班<br />
          學號：<span v-if="selectedData && selectedData.studentId">{{
            selectedData.studentId
          }}</span
          ><br />
          姓名：<span v-if="selectedData && selectedData.studentName">{{
            selectedData.studentName
          }}</span
          ><br />
        </p>
      </div>
      <div>
        <table>
          <thead>
            <th><b>課程名稱</b></th>
            <th><b>學分數</b></th>
          </thead>
          <tbody>
            <tr>
              <td v-if="selectedData && selectedData.courseName">
                {{ selectedData.courseName }}
              </td>
              <td v-if="selectedData && selectedData.credit">
                {{ selectedData.credit }}學分
              </td>
            </tr>
            <tr>
              <!--學生之預警課程學分數-->
              <b
                >預警課程學分數合計：<span
                  v-if="selectedData && selectedData.totalCredit"
                  >{{ selectedData.totalCredit }}</span
                >學分</b
              >
            </tr>
          </tbody>
        </table>
        <p>
          <b
            >※&nbsp;本學期總修習學分數：<span
              v-if="selectedData && selectedData.totalCredit"
              >{{ selectedData.totalCredit }}</span
            >學分</b
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useApiDataStore } from "../store/apiDataStore";
import { ref, computed, onMounted } from "vue";
import print from "vue3-print-nb";

export default {
  name: "PrintContent",
  directives: { print },
  setup() {
    const apiDataStore = useApiDataStore();
    const currentDate = ref("");

    onMounted(() => {
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
    });

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
      const result = [];
      for (const selectedData of paginatedData.value) {
        for (const warning of selectedData.warnings) {
          if (warning.department && deptName.hasOwnProperty(warning.department)) {
            result.push(deptName[warning.department]);
            break;
          }
        }
      }
      return result;
    });

    return {
      selectedData: apiDataStore.selectedData,
      currentDate,
      departmentName,
    };
  },
};
</script>

<style scoped>
.print-content {
  @page {
    size: A4;
  }
  display: flex;
  flex-direction: column;
}

@page :first {
  /* background-color: red; */
}

@page :left {
  margin-left: 2cm;
  margin-right: 4cm;
}
@page :right {
  margin-left: 4cm;
  margin-right: 2cm;
}

.section1 {
  flex: 1;
}

.section2 {
  flex: 2;
}
</style>
