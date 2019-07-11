import Vuex from "vuex";
import orderStore from "./order-store";

export default new Vuex.Store({
  modules: {
    currentOrder: orderStore
  }
});
