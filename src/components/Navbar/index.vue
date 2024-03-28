<template>
  <div class="nav_wapper">
    <Hamburg />
    <bread-crumb></bread-crumb>

    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="size" :src="circleUrl"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import Hamburg from "../Hamburg";
import BreadCrumb from "../BreadCrumb";

export default {
  name: "navbar",
  components: {
    Hamburg,
    BreadCrumb,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.nav_wapper {
  height: 48px;
  background: #ccc;
  display: flex;
  align-items: center;
}
</style>
