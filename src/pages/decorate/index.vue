<template>
  <div>
    <page-head></page-head>
    <page-left></page-left>
    <page-view></page-view>
  </div>
</template>
<script>
import PageLeft from "./components/PageLeft";
import PageView from "./components/PageView";
import PageHead from "./components/PageHead";

import { getCmsPageById } from "@/api/activity";
import { createRandomId } from "@/utils";
export default {
  components: {
    PageLeft,
    PageView,
    PageHead,
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
        // 处理数据
        this.postDataToH5(data);
      }
    },
    postDataToH5(data) {
      if (data && data.componentList) {
        data.componentList.forEach((item) => {
          if (item.data.validTime && typeof item.data.validTime === "string") {
            item.data.validTime = JSON.parse(item.data.validTime);
          }
          if (!item.id) {
            const id = createRandomId();
            item.id = item.data.component + "-" + id;
          }
          this.$store.commit("UPDATE_COMPONENT", { data });
        });
      }
    },
  },
};
</script>
<style scoped>
</style>