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
nav {
  /*nav為選擇器*/
  background-color: #003c6b !important;
  height: 10%;
}
.navbar-nav .nav-link .bi {
  margin-left: -10%;
}
.btn-custom {
  background-color: #4682b4;
  border-color: #ced4da;
}
.btn-custom:hover {
  background-color: #0f4f85;
}
.home {
  cursor: pointer;
}
.header-title {
  color: #ffffff;
  font-size: 1.8rem;
  margin-top: 4%;
  margin-left: -40%;
  margin-bottom: 0;
}
.top-logo {
  max-width: 80%;
  height: 80%;
  margin-left: 5%;
  margin-top: 1%;
}

.nav-link {
  width: 45px;
  height: 45px;
}
.home-title {
  color: #ffffff;
}

.d-flex .flex-column {
  margin-left: -40%;
  margin-top: 25%;
}

@media screen and (max-width: 767px) {
  nav {
    width: 100%;
    padding: 10px;
    height: 10%;
  }
  .navbar-nav .nav-link .bi {
    margin-left: 10%;
  }
  .nav-link {
    margin-top: -10%;
    width: 100%;
  }
  .btn-custom {
    margin-top: 10px;
  }
  .btn-img {
    width: 80%;
    margin-top: 1%;
  }
  .top-logo {
    width: 70%;
    margin-top: 1%;
    margin-left: 17%;
  }
  .header-title {
    font-size: 1.25rem;
    margin-top: 0%;
    margin-left: 37%;
    margin-bottom: 0;
  }
  .navbar-nav {
    font-size: 0.3rem;
  }
  .d-flex .flex-column {
    width: 80%;
    margin-top: 10%;
  }
  .navbar-nav {
    margin-top: 30%;
    width: 120%;
  }
  .d-flex .flex-column {
    width: 75%;
    margin-top: -10%;
    margin-left: 0%;
  }
  .home-pic {
    width: 120%;
    margin-top: -100%;
    margin-left: 11%;
  }
  .home-title {
    font-size: 14px;
    margin-top: -20%;
    margin-left: 5%;
  }
}
</style>
