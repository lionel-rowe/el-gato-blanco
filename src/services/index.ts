import { orderService } from "@/services/order-service";
import { productService } from "@/services/product-service";
import { categoryService } from "@/services/category-service";
import { modalService } from "@/services/modal-service";

const ServicesPlugin = {
  install (Vue) {
    Vue.prototype.$modalService = modalService;
    Vue.prototype.$orderService = orderService;
    Vue.prototype.$productService = productService;
    Vue.prototype.$categoryService = categoryService;
  }
};

export default ServicesPlugin;
