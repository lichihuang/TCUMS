<template>
  <div class="footer">
    <p class="mb-0">
      CopyRight © 2024 -
      <a href="index.html">Tzu Chi University Computer Center, All Right Reserved</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: "CopyrightNotice",
};
</script>

<style scoped>
.footer {
  position: fixed;
  font-size: 0.7rem;
  text-align: center;
}

@media (max-width: 1200px) {
  .footer {
    position: fixed;
    font-size: 0.7rem;
    text-align: center;
  }
}
@media (max-width: 991px) {
  .footer {
    position: fixed;
    font-size: 0.7rem;
    text-align: center;
  }
}
@media (max-width: 769px) {
  .footer {
    /* position: fixed;
    bottom: 1%;
    width: 100%; */
    margin-left: 27%;
    margin-top: -9%;
    margin-bottom: 50%;
  }
}
@media (max-width: 575px) {
  .footer {
    /* position: fixed;
    bottom: 1%;
    width: 100%; */
    margin-left: 20%;
    margin-top: -25%;
  }
}
</style>
