import Vue from "vue";
import Vuex from "vuex";

import App from "./app.vue";
import router from "./router";
import "@/filters/index";

import ServicesPlugin from "@/services/index";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faMinus,
  faTrashAlt,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.use(Vuex);
Vue.use(ServicesPlugin);

library.add(faPlus, faMinus, faTrashAlt, faCheck);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
