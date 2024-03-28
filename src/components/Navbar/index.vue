<template>
  <div class="jjj">
    <Hamburg />
    <bread-crumb></bread-crumb>
    <el-avatar :size="size" :src="circleUrl"></el-avatar>
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
.jjj {
  height: 48px;
  background: #ccc;
}
</style>
