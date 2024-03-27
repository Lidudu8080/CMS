<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>
<script>
import { Validator } from "@bigbighu/cms-utils";
export default {
  name: "link",
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    linkProp(url) {
      if (Validator.isExternal(url)) {
        // 如果满足条件，那么就是一个外部链接，把动态组件渲染成a标签
        return {
          is: "a",
          href: url,
          target: "_blank",
          rel: "noopener",
        };
      } else {
        // 如果不满足条件，那么就是一个内部链接，直接跳转
        return {
          is: "router-link",
          to: url,
        };
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>
