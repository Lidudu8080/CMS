// 函数式组件
<script>
export default {
  name: "MenuItem",
  functional: true, //代表是一个函数式组件
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    console.log(icon, title, "icon, title");
    const vnodes = [];
    const classStr = "iconfont icon-" + icon;
    if (icon) {
      vnodes.push(<i class={classStr}></i>);
    }
    if (title) {
      vnodes.push(<span>{title}</span>);
    }
    return vnodes;
  },
};
</script>
<style lang="less" scoped>
.iconfont {
  font-size: 18px;
  color: #bfcbd9;
}
</style>
