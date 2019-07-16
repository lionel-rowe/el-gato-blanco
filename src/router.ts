import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home.vue";

Vue.use(Router);

const APP_TITLE = "El Gato Blanco";
const DELIMITER = " | ";

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "Home"
      }
    },
    {
      path: "/orders/:id",
      name: "orders",
      component: () => import("./views/order.vue"),
      meta: {
        title: "Order"
        /* title: to => `Order ${to.params.id}`, */
      }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("./views/about.vue"),
      meta: {
        title: "About"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    let newTitle;
    switch (typeof to.meta.title) {
      case "function":
        newTitle = to.meta.title(to, from);
        break;
      case "string":
        newTitle = to.meta.title;
        break;
    }

    document.title = `${APP_TITLE}${DELIMITER}${newTitle}`;
  }

  next();
});

export default router;
