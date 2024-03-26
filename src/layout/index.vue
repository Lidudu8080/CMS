<template>
  <div>
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
  data() {},
  methods: {},
};
</script>
