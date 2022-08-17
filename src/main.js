import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import VueCookies from 'vue-cookies' //added
Vue.use(VueCookies); // added
axios.defaults.withCredentials = true; //added

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

import Vuelidate from "vuelidate";
//import BootstrapVue from "bootstrap-vue"; //added
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  FormCheckboxPlugin,
  FormRadioPlugin,
  ModalPlugin,
  ImagePlugin,
  FormFilePlugin,
  FormTextareaPlugin,
  PopoverPlugin,
} from "bootstrap-vue";
import { Modal } from "bootstrap";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  FormCheckboxPlugin,
  FormRadioPlugin,
  ModalPlugin,
  ImagePlugin,
  FormFilePlugin,
  FormTextareaPlugin,
  PopoverPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);
//Vue.use(BootstrapVue);// added
Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  lastSearch: localStorage.lastSearch,
  
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("lastSearch");
    this.username = undefined;
  },
  updateLastSearch(lastSearch){
    localStorage.setItem("last_search", lastSearch);
    //sessionStorage.setItem("last_search", last_search1);
    this.lastSearch = lastSearch;
  },
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
//check