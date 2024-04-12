import { createApp } from 'vue';
import App from './App.vue';
import SearchMain from "./views/SearchMain.vue"
import ResultMain from "./views/ResultMain.vue"
import router from './router';
import Print from 'vue3-print-nb'

import axios from './axios/axios'

import 'mdb-vue-ui-kit/css/mdb.min.css';

import { createPinia } from 'pinia'
import { SemesterWarningCountStore } from './store/counter'

document.body.style.background = 'url("./LoginVideo.mp4") center center / cover no-repeat';
//document.body.style.overflow = 'hidden'; // 禁止上下滾動

const app = createApp(App);
app.component('SearchMain', SearchMain); // 注冊 SearchMain 組件
app.component('ResultMain', ResultMain); // 注冊 ResultMian 組件
app.use(router);
app.mount('#app'); 
app.use(createPinia());
app.use(Print)

app.config.globalProperties.$axios = axios;