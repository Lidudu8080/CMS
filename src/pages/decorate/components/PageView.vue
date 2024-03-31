<template>
  <div class="page-view" @dragover="dragovered($event)"></div>
</template>
<script>
export default {
  name: "PageView",
  data() {
    return {};
  },

  methods: {
    dragovered(event) {
      console.log(event.dataTransfer, "放置");
    },
  },
};
</script>
<style lang="less" scoped>
.page-view {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 650px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  display: flex;
  justify-content: center;
  user-select: none;
}
</style>
