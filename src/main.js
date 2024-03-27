import Vue from "vue";
import App from "./App.vue";
import Router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/app.less"; // 后台装修搭建系统公共CSS

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router: Router,
  render: (h) => h(App),
}).$mount("#app");
