<template>
  <div ref="pageView" class="page-view">
    <!-- H5预览模块 -->
    <div class="preview">
      <div class="preview-head">
        <div class="preview-head-title">
          {{ pageData.name || "微页面标题" }}
        </div>
      </div>
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
        />
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
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import settings from "@/config";

export default {
  name: "PageView",
  data() {
    return {
      showHasCache: false,
    };
  },
  computed: {
    ...mapState([
      "pageData",
      "previewHeight",
      "componentsTopList",
      "dragActive",
      "addComponentIndex",
    ]),
    previewSrc() {
      return (
        settings.decorateViewSrc +
        `?pageId=${this.$route.query.id || ""}&noLogin=true`
      );
    },
  },
  mounted() {  
    this.initMessage();
  },
  methods: {
    ...mapMutations([
      "SET_DRAG_INDEX",
      "VIEW_ADD_PREVIEW",
      "VIEW_DELETE_PREVIEW",
    ]),
    ...mapActions(["initMessage"]),
    onDragover(event) {
      event.preventDefault(); // 当前区域可以被进入
      const viewWrapTop = 191;
      let dropTop = this.$refs.pageView.scrollTop + event.pageY - viewWrapTop;
      console.log(dropTop, "距离");
      let addIndex = 0;
      for (let i = this.componentsTopList.length - 1; i >= 0; i--) {
        const value = this.componentsTopList[i];
        const prev = this.componentsTopList[i - 1] || 0;
        const _half = (value - prev) / 2;
        if (i === 0 && dropTop <= _half) break;
        if (dropTop > value - _half) {
          addIndex = i + 1;
          break;
        }
      }
      // 添加
      if (this.addComponentIndex === addIndex) return;
      this.SET_DRAG_INDEX(addIndex);
      this.VIEW_ADD_PREVIEW(addIndex);
    },
    // 删除
    onDragout(event) {
      event.preventDefault();
      if (this.addComponentIndex != null) {
        this.SET_DRAG_INDEX(null);
        this.VIEW_DELETE_PREVIEW();
      }
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
    margin: 72px auto 0;
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
