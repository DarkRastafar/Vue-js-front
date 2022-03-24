import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index.js'
import Paginate from "vuejs-paginate-next";
import "@/assets/css/table.css"
import { vSelect } from "vue-select";
import "vue-select/dist/vue-select.css";



const app = createApp(App);
app.use(store)
app.use(router)
app.mount('#app')

Vue.use(Paginate)
Vue.component("v-select", vSelect);
