<template>
  <div class="page-view">
    <!-- H5手机导航栏 -->
    <div class="preview">
      <div class="preview-head">
        <div class="preview-head-title">
          {{ pageData.name || "微页面标题" }}
        </div>
      </div>

       <!-- iframe内容 -->
    <div class="preview-wrap">
      <iframe
        id="previewIframe"
        class="preview-iframe"
        :src="previewSrc"
        title="频道名称"
        frameborder="0"
        allowfullscreen
        width="100%"
        :height="previewHeight"
        @load="onloadH5"
      >
      </iframe>
    </div>
    </div>

   
    <div
      v-if="dragActive"
      class="preview-drag-mask"
      @dragover="onDragover($event)"
    />
    <div
      v-if="dragActive"
      class="preview-drag-out"
      @dragover="onDragout($event)"
    />
  </div>
</template>
<script>
import { mapState } from "vuex";
import settings from "@/config";

export default {
  name: "PageView",
  data() {
    return {
      dragActive: false,
    };
  },
  computed: {
    ...mapState(["pageData",'previewHeight']),
    previewSrc() {
      return (
        settings.decorateViewSrc +
        `?pageId=${this.$route.query.id || ""}&noLogin=true`
      );
    },
  },
  methods: {
    dragovered(event) {
      console.log(event.dataTransfer, "放置");
    },
    onloadH5() {
      this.$store.commit("VIEW_UPDATE");
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
  width: 375px;
  height: 650px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  display: flex;
  justify-content: center;
  user-select: none;
}
.cache-box {
  position: absolute;
  left: 20px;
  right: 20px;
  top: 20px;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  background: @color-1-bg;
  border: 1px solid @color-1;
  padding: 0 10px;
  z-index: 2;
  .color-1 {
    cursor: pointer;
  }
  .cache-close {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    color: #aaa;
  }
}
.preview {
  position: absolute;
  width: 100%;
  .preview-head {
    height: @content-header-height;
    width: 375px;
    margin: 0 auto 0;
    background: url("~@/assets/img/layout/header_bg.png") left top no-repeat;
    background-size: cover;
    position: relative;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
    .preview-head-title {
      width: 180px;
      margin: 0 auto;
      height: 64px;
      font-size: 14px;
      text-align: center;
      padding-top: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .preview-iframe {
    min-height: 600px;
  }
  .preview-drag-mask {
    position: absolute;
    left: 50%;
    top: 60px;
    bottom: 20px;
    width: 520px;
    margin-left: -260px;
    z-index: 10;
  }
  .preview-drag-out {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9;
  }
}
</style>
