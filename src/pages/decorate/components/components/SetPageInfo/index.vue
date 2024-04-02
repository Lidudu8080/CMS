<template>
  <div>
    <!-- 函数式组件，只显示内容，无逻辑处理 -->
    <ComTitle title="页面设置" />

    <ComGroup title="页面名称" name-black content-block>
      <el-input
        v-model.lazy="name"
        class="input-name"
        placeholder="请输入页面名称"
      />
    </ComGroup>
    <ComGroup title="微信分享文案" name-black content-block>
      <el-input
        v-model.lazy="shareDesc"
        class="input-name"
        maxlength="28"
        placeholder="用户通过微信分享给朋友时显示，最多28个汉字"
      />
    </ComGroup>

    <ComGroup
      title="微信分享卡片"
      tips="图片建议长宽比为5:4"
      name-black
      content-block
    >
      <el-button type="text" class="mr-15" @click="shareImage = ''">
        重置
      </el-button>
      <UpLoadBox
        :img-url.sync="shareImage"
        @editImg="showDialogImage('shareImage')"
      />
    </ComGroup>
  </div>
</template>
<script>
import ComTitle from "@/components/BasicUi/ComTitle";
import ComGroup from "@/components/BasicUi/ComGroup";
import UpLoadBox from "@/components/BasicUi/UpLoadBox";

export default {
  name: "SetPageInfo",

  components: {
    ComTitle,
    ComGroup,
    UpLoadBox,
  },
  data() {
    return {};
  },
  computed: {
    name: {
      get: function () {
        return this.$store.state.pageData.name;
      },
      set: function (val) {
        this.updatePageInfo({ name: val });
      },
    },
    shareDesc: {
      get: function () {
        return this.$store.state.pageData.shareDesc;
      },
      set(val) {
        this.updatePageInfo({ shareDesc: val });
      },
    },
  },
  onLoad() {},
  methods: {
    // 上传图片
    showDialogImage(key) {
      // this.$store.commit("SET_UPIMAGE_VISIBLE", true);
      // this.$store.commit("SET_UPIMAGE_FUC", this.upLoadImgSuccess);
      this.uploadKey = key;
    },
    // 图片上传成功
    upLoadImgSuccess(imgUrl) {
      this[this.uploadKey] = imgUrl;
    },
    updatePageInfo(value) {
      this.$store.commit("SET_PAGE_CONFIG", value);
    },
  },
};
</script>
<style lang="less" scoped>
</style>
