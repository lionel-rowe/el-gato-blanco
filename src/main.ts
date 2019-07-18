import Vue from "vue";
import Vuex from "vuex";
import Vuelidate from "vuelidate";

import App from "./app.vue";
import router from "./router";
import "@/filters/index";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faMinus,
  faTrashAlt,
  faCheck,
  faInfoCircle,
  faExclamationTriangle,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.use(Vuex);
Vue.use(Vuelidate);

library.add(
  faPlus,
  faMinus,
  faTrashAlt,
  faCheck,
  faInfoCircle,
  faExclamationTriangle,
  faTimes
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
