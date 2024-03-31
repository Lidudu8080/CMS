<template>
  <div>
    <page-left></page-left>
    <page-view></page-view>
  </div>
</template>
<script>
import PageLeft from "./components/PageLeft";
import PageView from "./components/PageView";
import { getCmsPageById } from "@/api/activity";
export default {
  components: {
    PageLeft,
    PageView,
  },
  data() {
    return {};
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const { id } = this.$route.query;
      // 如果有id就是编辑，没有就是新增
      if (id) {
        const { data } = await getCmsPageById(id);
        console.log(data, "数据");
      }
    },
  },
};
</script>
<style scoped>
</style>