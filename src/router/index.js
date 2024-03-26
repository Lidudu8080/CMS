import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout";

Vue.use(Router);

const constantRoutes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "首页",
        meta: { title: "首页" },
        component: () => import("@/pages/home"),
      },
    ],
  },
];

export default new Router({ routes: constantRoutes });
