<template>
  <div class="page-view"></div>
</template>
<script>
export default {
  name: "PageView",
  data() {
    return {};
  },

  methods: {

    
  },
};
</script>
<style lang="less" scoped>
.page-view {
  position: absolute;
  top: 56px;
  left: 186px;
  right: 376px;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f7f8fa;
  display: flex;
  justify-content: center;
  user-select: none;
}
</style>
