<template>
  <div class="page-left">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        :title="item.title"
        class="component-item"
        v-for="(item, index) in componentlist"
        :key="index"
      >
        <ul
          class="component-list"
          v-for="(component, size) in item.components"
          :key="size"
        >
          <li
            class=""
            draggable="true"
            @dragstart="onDragestart(component, $event)"
            @dragend="onDragend($event)"
          >
            <i :class="component.iconClass" style="font-size: 28px" />
            <p class="name">
              {{ component.name }}
            </p>
            <p class="num">
              {{ component.maxNumForAdd }}
            </p>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import componentlist from "@/config/component-list";
export default {
  name: "PageLeft",
  data() {
    return {
      componentlist,
    };
  },
  created() {},
  computed: {
    ...mapState(["dragComponent"]),
  },

  methods: {
    ...mapMutations(["SET_DRAG_STATE", "SET_DRAG_COMPONENT"]),

    onDragestart(component) {
      this.SET_DRAG_STATE(true);
      this.SET_DRAG_COMPONENT(JSON.parse(JSON.stringify(component)));
    },
    onDragend() {
      this.SET_DRAG_STATE(false);
    },
  },
};
</script>
<style lang="less" scoped>
.page-left {
  position: absolute;
  top: 56px;
  left: 0;
  width: 186px;
  overflow-x: hidden;
  overflow-y: auto;
  bottom: 0;
  background: #fff;
  user-select: none;
}
/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
}

// 组件列表
.component-item {
  padding: 0 20px;
  margin-top: 22px;
  .component-list {
    overflow: hidden;
    width: 50%;

    li {
      font-size: 12px;
      padding-bottom: 8px;
      text-align: center;
      &.drag-enabled {
        cursor: move;
      }
      &.drag-disabled {
        cursor: not-allowed;
      }
      &.drag-enabled:hover {
        background: @color-1;
        color: #fff;
        border-radius: 2px;
        .ico {
          background-position: 0 -32px;
        }
        .num,
        .name {
          color: #ffffff !important;
        }
      }
      .ico {
        display: inline-block;
        margin-top: 8px;
        background-position: 0 0;
        height: 32px;
        width: 32px;
        background-size: cover;
      }
      .name {
        line-height: 16px;
        margin-top: -4px;
      }
      .num {
        font-size: 12px;
        color: #999999;
      }
    }
  }
}

// 折叠面板样式
.el-collapse {
  border: none;
  /deep/ .el-collapse-item__header {
    border: none;
    height: 30px;
    line-height: 30px;
  }
  /deep/ .el-collapse-item__wrap {
    border: none;
  }
  /deep/ .el-collapse-item__content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 0;
  }
}
</style>
