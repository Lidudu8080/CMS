<template>
  <div class="appwaaper">
    <Sidebar />
    <Navbar />
    <AppMain />
  </div>
</template>
<script>
import { Navbar, Sidebar, AppMain } from "@/components/index.js";
export default {
  name: "layout",
  components: {
    Sidebar,
    Navbar,
    AppMain,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.appwaaper {
  height: 100%;
}
</style>
