import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout";

Vue.use(Router);

const constantRoutes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "首页",
        meta: { title: "首页" },
        component: () => import("@/pages/home"),
      },
      {
        path: "/activity",
        name: "activity",
        meta: { title: "活动管理" },
        component: () => import("@/pages/activity"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../pages/login/index.vue"),
    name: "Login",
    hidden: true,
    meta: { title: "登录" },
  },
  {
    path: "/decorate",
    name: "decorate",
    component: () => import("@/pages/decorate"),
  },
];

export default new Router({ routes: constantRoutes });
