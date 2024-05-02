<template>
  <div class="footer">
    <lord-icon
      src="https://cdn.lordicon.com/ternnbni.json"
      trigger="hover"
      colors="primary:#5d7c9c"
      class="btn-top lord-icon"
      @click="scrollToTop"
    >
    </lord-icon>
    <br />
    <lord-icon
      src="https://cdn.lordicon.com/xcrjfuzb.json"
      trigger="hover"
      colors="primary:#5d7c9c"
      class="btn-buttom lord-icon"
      @click="scrollToBottom"
    >
    </lord-icon>
  </div>

  <div class="illustrateBox" v-cloak>
    <div>
      <div class="mask" v-if="showIllustrate"></div>
      <div class="illustrate-set" v-if="showIllustrate">
        <img :src="illustrateBox" alt="Illustrate" />
      </div>
      <div class="illustrate">
        <lord-icon
          src="https://cdn.lordicon.com/dvqeipeg.json"
          trigger="hover"
          style="width: 70px; height: 70px"
          @click="showIllustrate = !showIllustrate"
        >
        </lord-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
const illustrateBox = "./IllustrateBox.svg";

export default {
  name: "PageController",
  components: {
    lottie,
    defineElement,
  },
  setup() {
    const showIllustrate = ref(false);

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    const closeIllustrate = () => {
      showIllustrate.value = false;
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest(".illustrateBox")) {
        closeIllustrate();
      }
    };

    onMounted(() => {
      window.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
      window.removeEventListener("click", handleClickOutside);
    });

    return {
      scrollToTop,
      scrollToBottom,
      closeIllustrate,
      showIllustrate,
      showIllustrate,
      illustrateBox,
    };
  },
};
</script>

<style scoped>
.lord-icon:hover {
  cursor: pointer;
  filter: brightness(65%);
}
.btn-top {
  width: 50px;
  height: 50px;
  opacity: 0.8;
}
.btn-buttom {
  width: 50px;
  height: 50px;
  opacity: 0.8;
}
.footer {
  text-align: right;
  margin-left: -1.3%;
  margin-bottom: 1%;
}
.illustrate {
  position: fixed;
  bottom: 20px;
  left: 30px;
  z-index: 9999;
}
.illustrate:hover {
  cursor: pointer;
}

[v-cloak] {
  display: none;
}

.box {
  display: flex;
  flex-direction: column;
}

.illustrate-set {
  position: fixed;
  top: 340px;
  left: 25px;
  z-index: 9999;
}

.mask {
  background-color: rgb(233, 16, 16);
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.btn {
  border-radius: 4px;
  border: 1px solid blue;
  padding: 4px 12px;
}

@media (min-width: 768px) {
  .footer {
    position: fixed;
    bottom: 1%;
    width: 100%;
  }
}

@media (max-width: 1200px) {
  .lord-icon:hover {
    cursor: pointer;
    filter: brightness(65%);
  }
  .btn-top {
    width: 80%;
    opacity: 0.8;
  }
  .btn-buttom {
    width: 80%;
    height: 50px;
    opacity: 0.8;
  }
  .footer {
    text-align: right;
    margin-left: 37%;
    margin-bottom: 3%;
  }
  .illustrate {
    text-align: right;
    margin-left: 37%;
    margin-bottom: 3%;
  }
}
@media (max-width: 991px) {
  .lord-icon:hover {
    cursor: pointer;
    filter: brightness(65%);
  }
  .btn-top {
    width: 50px;
    height: 50px;
    opacity: 0.8;
  }
  .btn-buttom {
    width: 50px;
    height: 50px;
    opacity: 0.8;
  }
  .footer {
    text-align: right;
    margin-left: -2%;
    margin-bottom: 1%;
  }
}
@media (max-width: 769px) {
  .lord-icon:hover {
    cursor: pointer;
    filter: brightness(65%);
  }
  .btn-top {
    width: 50px;
    height: 50px;
    opacity: 0.8;
  }
  .btn-buttom {
    width: 50px;
    height: 50px;
    opacity: 0.8;
  }
  .footer {
    text-align: right;
    margin-left: -1.3%;
    margin-bottom: 1%;
  }
}
@media (max-width: 575px) {
  .lord-icon:hover {
    cursor: pointer;
    filter: brightness(65%);
  }
  .btn-top {
    width: 50px;
    height: 50px;
    opacity: 0.8;
  }
  .btn-buttom {
    width: 50px;
    height: 50px;
    opacity: 0.8;
  }
  .footer {
    position: fixed;
    text-align: right;
    margin-left: -1.3%;
    margin-bottom: 1%;
  }
}
</style>
