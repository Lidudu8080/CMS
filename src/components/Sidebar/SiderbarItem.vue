<template>
  <div v-if="!item.hidden" class="menuwappar">
    <!-- 一级菜单 -->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link>
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <i class="el-icon-tickets"></i>
          {{ onlyOneChild.meta.title }}
        </el-menu-item>
      </app-link>
    </template>

    <!-- 多级菜单 -->
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      ></sidebar-item>
    </el-submenu>
  </div>
</template>
<script>
import AppLink from "./Link";
import Item from "./Item";
export default {
  name: "SidebarItem",
  components: {
    AppLink,
    Item,
  },
  props: {
    //传进来的菜单项,菜单项中有hidden字段控制菜单的显示隐藏
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      onlyOneChild: {}, // 没有子菜单的一级菜单数据
    };
  },
  methods: {
    resolvePath(routePath) {
      console.log(this.onlyOneChild, "onlyOneChild");
      console.log(path.resolve(this.basePath, routePath), "routePath");
      if (Validator.isExternal(routePath)) {
        return routePath;
      }
      if (Validator.isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
  computed: {
    // 判断菜单项是否有子菜单，没有就是一级菜单，有就是多级菜单
    hasOneShowingChild(children = [], parent) {
      // 判断子菜单有没有数据
      const showingChild = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          return true;
        }
      });
      console.log(showingChild);
      //如果过滤后的数组等于0的话，就代表没有要显示的子菜单，那么就显示item
      if (showingChild.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="less" scoped>
</style>
