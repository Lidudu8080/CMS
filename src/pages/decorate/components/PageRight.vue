<template>
  <div class="page-right">
    <!-- 左侧tab(页面和组件之间的切换) -->
    <ChangeSetType v-model="setType"></ChangeSetType>

    <!-- 页面 -->
    <div v-show="setType === 1">
      <SetPageInfo />
    </div>

    <!-- 组件 -->
    <div v-show="setType === 2"></div>
  </div>
</template>
<script>
// 动态引入组件
// import { dynamicComponents } from "@/utils";
import ChangeSetType from "./components/ChangeSetType";
import SetPageInfo from "./components/SetPageInfo";

export default {
  name: "PageRight",
  data() {
    return {};
  },
  components: {
    ChangeSetType,
    SetPageInfo,

    // ...dynamicComponents(),
  },
  computed: {
    setType: {
      get: function () {
        return this.$store.state.setType;
      },
      set: function (val) {
        this.$store.commit("SET_SETTYPE", val);
      },
    },
  },
  methods: {},
};
</script>
<style lang="less">
@import url("~@/styles/icon.less");

.page-right {
  position: absolute;
  top: 56px;
  right: 0;
  bottom: 0;
  width: 376px;
  padding-bottom: 50px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
}

// 组件配置模块
.com-group {
  // slide 滑块
  .el-slider {
    width: 95%;
    .el-slider__input {
      width: 60px;
    }
    .el-slider__runway {
      margin-right: 80px;
    }
  }
  // 单选框
  .el-radio {
    line-height: 30px;
    color: #323233;
  }
}

// 右上角删除样式
.up-pic-item-delete {
  position: absolute;
  cursor: pointer;
  font-size: 20px;
  right: -10px;
  top: -10px;
  color: #bbb;
  background: #fff;
  border-radius: 50%;
  visibility: hidden;
  z-index: 2;
  &:hover {
    color: #aaa;
  }
}
</style>
