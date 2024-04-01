import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
Vue.use(Vuex);

import { Messager } from "@/utils";
import settings from "@/config";

const messager = new Messager(settings.decorateOrigin);

// webpack动态引入modules
const modulesFiles = require.context("./modules", true, /\.js$/);
let modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
modules = Object.assign({}, modules);

// H5初始化数据
const emptyPageData = {
  id: "",
  name: "页面标题",
  shareDesc: "", // 微信分享文案
  shareImage: "", // 微信分享图片
  backgroundColor: "", // 页面背景颜色
  backgroundImage: "", // 页面背景图片
  backgroundPosition: "top", // 页面背景位置
  cover: "",
  componentList: "",
};

// 实例
const store = new Vuex.Store({
  state: {
    //组件是否正在被拖动
    dragActive: false,
    //被拖动的组件信息
    dragComponent: {},
    pageData: JSON.parse(JSON.stringify(emptyPageData)),
    previewHeight: "",
    componentsTopList: [],
  },
  mutations: {
    // 设置组件拖拽状态
    SET_DRAG_STATE(state, value) {
      state.dragActive = value;
    },
    // 设置当前正在被拖动的组件对象
    SET_DRAG_COMPONENT(state, value) {
      state.dragComponent = value;
    },
    // H5页面更新
    UPDATE_COMPONENT(state, { data }) {
      state.pageData = data || {};
    },
    // h5内容的更新
    VIEW_UPDATE(state, disabledRestHeight = false) {
      messager.emit("pageChange", {
        disabledRestHeight,
        value: state.pageData,
      });
    },
    // 获取H5组件高度并更新
    UPDATE_PAGE_HEIGHT(state, { height, list }) {
      state.previewHeight = height;
      state.componentsTopList = list;
    },
  },
  actions: {
    initMessage({ commit }) {
      messager.on("pageHeightChange", (data) => {
        let height = data.height ? data.height + 72 : 768;
        let list = data.componentsTopList || [];
        commit("UPDATE_PAGE_HEIGHT", { height, list });
      });
      //   messager.on("pageChange", (data) => {
      //     commit("UPDATE_COMPONENT", { data });
      //   });
      //   // 监听H5预览页面选中项id变化
      //   messager.on("setActive", (id) => {
      //     commit("SET_ACTIVE_ID", id);
      //     commit("SET_SETTYPE", 2);
      //   });
    },
  },
  getters,
  modules,
});

Vue.store = store;
export default store;
