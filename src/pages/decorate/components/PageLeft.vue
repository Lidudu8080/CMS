<template>
  <div class="page-left">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        v-for="(item, index) in componentlist"
        :key="index"
        class="component-item"
        :title="item.title"
        :name="index + 1"
      >
        <ul class="component-list">
          <li
            v-for="(component, size) in item.components"
            :key="size"
            :class="
              draggableEnable(component) ? 'drag-enabled' : 'drag-disabled'
            "
            :draggable="draggableEnable(component)"
            @dragstart="onDragstart(component, $event)"
            @dragend="onDragend($event)"
          >
            <i :class="component.iconClass" style="font-size: 28px" />
            <p class="name">
              {{ component.name }}
            </p>
            <p class="num">
              {{
                `${componentMap[component.data.component] || 0}/${
                  component.maxNumForAdd
                }`
              }}
            </p>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import componentlist from "@/config/component-list";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "PageLeft",
  data() {
    return {
      componentlist,
      activeNames: [1, 2],
    };
  },
  computed: {
    componentMap() {
      return this.$store.getters.pageComponentTotalMap;
    },
    ...mapState(["dragComponent", "addComponentIndex"]),
  },
  methods: {
    ...mapMutations([
      "SET_DRAG_STATE",
      "SET_DRAG_COMPONENT",
      "SET_DRAG_INDEX",
      "VIEW_SET_ACTIVE",
    ]),
    ...mapActions(["pageChange"]),
    // 拖动开始
    onDragstart(component, event) {
      console.log("拖动组件", component, event);
      //1.把拖动状态设置为true,(iframe内部根据这个状态来监听iframe页面被移入的事件触不触发)
      // 拖动的组件数据存起来，然后在iframe内部获取到存入的数据，并通过跨源通信传递给iframe(crs项目)页面
      this.SET_DRAG_STATE(true);
      this.SET_DRAG_COMPONENT(JSON.parse(JSON.stringify(component)));
    },
    //拖动结束
    onDragend() {
      //把拖动状态设置为false,
      this.SET_DRAG_STATE(false);
      let addIndex = this.addComponentIndex;
      if (addIndex != null) {
        console.log("生成组件11111111");
        this.pageChange({
          type: "add",
          index: addIndex,
          data: this.dragComponent,
        });
        this.SET_DRAG_INDEX(null);
        console.log(addIndex, "addIndex");
        this.VIEW_SET_ACTIVE(addIndex);
      }
    },
    draggableEnable(component) {
      let curNum = this.componentMap[component.data.component] || 0;
      return curNum < component.maxNumForAdd;
    },
  },
};
</script>

<style lang="less" scoped>
// 左侧框架
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

// 组件列表
.component-item {
  padding: 0 20px;
  margin-top: 22px;
  .component-list {
    overflow: hidden;
    li {
      float: left;
      width: 50%;
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
    padding-bottom: 0;
  }
}
</style>
