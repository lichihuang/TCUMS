<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top align-items-center">
    <div class="container-fluid d-flex align-items-center justify-content-between">
      <div class="navbar-brand sm-1">
        <img class="top-logo" src="/TopTitle1.png" alt="Top Logo" />
      </div>
      <div class="d-flex align-items-center flex-grow-1">
        <ul class="navbar-nav me-auto mb-24 mb-md-0" style="margin: 0">
          <li class="nav-item active d-flex">
            <p class="header-title">教務管理系統</p>
          </li>
        </ul>
        <div class="d-flex align-items-start ms-auto home" style="margin-top: 3px">
          <div class="home-area d-flex flex-column" @click="home">
            <lord-icon
              src="https://cdn.lordicon.com/epietrpn.json"
              trigger="hover"
              colors="primary:#121331,secondary:#d1e3fa,tertiary:#d59f80,quaternary:#ffc26c,quinary:#faebd7,senary:#646e78,septenary:#ffffff"
              stroke="bold"
              class="nav-link home-pic"
            ></lord-icon>
            <label class="home-title home-title-rwd">HOME</label>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { useRouter } from "vue-router";
defineElement(lottie.loadAnimation);
export default {
  name: "Header",
  components: {},
  setup() {
    const router = useRouter();
    const home = async () => {
      console.log("To PageSearch！");

      const resolvedRoute = router.resolve({ path: "/SearchMain" });
      console.log(resolvedRoute);
      window.location.href = resolvedRoute.href; // 使用 resolve 方法進行頁面導覽
    };
    return { home };
  },
};
</script>

<style scoped>
@import "../style/HeaderStyle.css";
</style>
