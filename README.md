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


1.创建vue2项目cms，配置vue.config.js文件()  使用css自动导入：style-resources-loader1.2.1
 router的配置  layout页面注册(主页面) layout页面布局(拆分组件Sidebar(左侧菜单)Navbar(顶部header)AppMain(中间部分))=>注册路由   components下面新建index来管理所有组件在其它页面的引入
 layout：Sidebar 



记录小问题
@compontents未下载依赖的报错 因为在components文件下时没有index.vue的，所以就会认为components是node_moudles下的依赖


