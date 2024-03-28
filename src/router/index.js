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
      // 可以继续添加更多的子路由...
    ],
  },
];

export default new Router({ routes: constantRoutes });
