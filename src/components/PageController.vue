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
</template>

<script>
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
export default {
  name: "PageController",
  components: {
    lottie,
    defineElement,
  },
  setup() {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    return {
      scrollToTop,
      scrollToBottom,
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
