<template>
  <div>
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

    <ComDivider />

    <ComGroup title="背景颜色">
      <el-button
        type="text"
        class="mr-15"
        @click="backgroundColor = initBgColor"
      >
        重置
      </el-button>
      <el-color-picker v-model="backgroundColor" size="small" />
    </ComGroup>

    <ComGroup title="背景图片">
      <el-button type="text" class="mr-15" @click="backgroundImage = ''">
        重置
      </el-button>
      <UpLoadBox
        :img-url.sync="backgroundImage"
        @editImg="showDialogImage('backgroundImage')"
      />
    </ComGroup>

    <ComGroup v-if="backgroundImage" title="背景图片位置">
      <el-radio v-model="backgroundPosition" label="top"> 居上 </el-radio>
      <el-radio v-model="backgroundPosition" label="bottom"> 居底 </el-radio>
    </ComGroup>
  </div>
</template>

<script>
import ComTitle from "@/components/BasicUi/ComTitle";
import ComGroup from "@/components/BasicUi/ComGroup";
import ComDivider from "@/components/BasicUi/ComDivider";
import UpLoadBox from "@/components/BasicUi/UpLoadBox";

export default {
  name: "SetPageInfo",
  components: { ComTitle, ComGroup, ComDivider, UpLoadBox },
  data() {
    return {
      initBgColor: "",
    };
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
      set: function (val) {
        this.updatePageInfo({ shareDesc: val });
      },
    },
    shareImage: {
      get: function () {
        return this.$store.state.pageData.shareImage;
      },
      set: function (val) {
        this.updatePageInfo({ shareImage: val });
      },
    },
    backgroundColor: {
      get: function () {
        return this.$store.state.pageData.backgroundColor;
      },
      set: function (val) {
        this.updatePageInfo({ backgroundColor: val });
      },
    },
    backgroundImage: {
      get: function () {
        return this.$store.state.pageData.backgroundImage;
      },
      set: function (val) {
        this.updatePageInfo({ backgroundImage: val });
      },
    },
    backgroundPosition: {
      get: function () {
        return this.$store.state.pageData.backgroundPosition;
      },
      set: function (val) {
        this.updatePageInfo({ backgroundPosition: val });
      },
    },
  },
  methods: {
    showDialogImage(key) {
      this.$store.commit("SET_UPIMAGE_VISIBLE", true);
      this.$store.commit("SET_UPIMAGE_FUC", this.upLoadImgSuccess);
      this.uploadKey = key;
    },
    upLoadImgSuccess(imgUrl) {
      this[this.uploadKey] = imgUrl;
    },
    updatePageInfo(value) {
      this.$store.commit("SET_PAGE_CONFIG", value);
    },
  },
};
</script>
