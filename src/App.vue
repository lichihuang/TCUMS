<script>
import Login from "./components/Login.vue";
import Header from "./components/Header.vue";
import Search from "./components/Search.vue";
import Result from "./components/Result.vue";
import PrintContent from "./components/PrintContent.vue";
import SearchMain from "./views/SearchMain.vue";
import ResultMain from "./views/ResultMain.vue";

export default {
  name: "App",
  components: {
    Login,
    Header,
    Search,
    Result,
    SearchMain,
    ResultMain,
    PrintContent,
  },
};
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
./views/Result.vue
