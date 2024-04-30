<template>
  <div>
    <Header />
    <Search />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Search from "../components/Search.vue";

export default {
  name: "SearchMain",
  components: {
    Header,
    Search,
  },
};
</script>

<style>
@media (max-width: 1200px) {
}
@media (max-width: 991px) {
}
@media (max-width: 768px) {
}
@media (max-width: 575px) {
}
</style>
