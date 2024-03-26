# cms

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

layout 页面思路
Sidebar 先是一张后台管理的图片和文字，点击跳转主页
菜单的封装思想： 1.将菜单项分离，菜单项包括一级菜单和多级菜单，封装 2.点击菜单项跳转的链接分为内部和外部链接，封装 3.多级菜单递归展示，那么每级菜单的项目都是一样的，封装函数式组件，利用 render 渲染

记录小问题
@compontents 未下载依赖的报错 因为在 components 文件下时没有 index.vue 的，所以就会认为 components 是 node_moudles 下的依赖
