import { createApp } from 'vue';
import App from './App.vue';
import SearchMain from "./views/SearchMain.vue"
import ResultMain from "./views/ResultMain.vue"
import router from './router';
import Print from 'vue3-print-nb'
import PrintContent from "./components/PrintContent.vue";
import axios from './axios/axios'
import 'mdb-vue-ui-kit/css/mdb.min.css';
import { createPinia } from 'pinia'
import { useApiDataStore } from './store/apiDataStore';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

document.body.style.background = 'url("./LoginVideo.mp4") center center / cover no-repeat';

const app = createApp(App);
app.component('SearchMain', SearchMain);
app.component('ResultMain', ResultMain);
app.component('PrintContent', PrintContent);
app.component('Print', Print);
app.use(router);
app.mount('#app'); 
app.use(createPinia());
app.use(Print)
app.use(VueSweetalert2);

app.config.globalProperties.$axios = axios;
