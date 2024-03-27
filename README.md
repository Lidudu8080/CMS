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

函数式应用场景：无需维护自身状态、对性能有较高要求，且逻辑相对简单的组件上。 1.展示型组件：如纯展示性的卡片、列表项等，它们不维护状态，因此渲染速度更快，性能更好。 2.性能优化：在性能敏感的场景下，如列表渲染、动画过渡等，使用函数式组件可以避免不必要的状态更新和渲染，从而提高应用的性能。
由于函数式组件没有状态，也没有生命周期钩子，它们通常比传统的组件更加轻量级，更适合用于渲染大量重复或简单的元素，从而提高应用的性能。

navbar 分为收起侧边栏图标 面包屑 登出，前两个功能式独立的，封装成组件
收起图标用 svg 的类型展示（可以无限缩小和放大，不会失真）
面包屑这里主要思想就是两个，一个是利用$this.route.match 获取到当前页面嵌套路由的信息，根据当前获取到的信息区分是否有主页，如果没有就和当前获取到的嵌套路由进行拼接，有的话就正常显示，再有就是面包屑的最后一个是当前页面不能点击，需要做一下判断。
等处功能直接在页面写就可以

༺ۣۣۖۖ༒ۣۣۖ༻ ༺ۣۣۖۖ༒ۣۣۖ༻༺ۣۣۖۖ༒ۣۣۖ༻༺ۣۣۖۖ 记录小问题༒ۣۣۖ༻༺ۣۣۖۖ༒ۣۣۖ༻༺ۣۣۖۖ༒ۣۣۖ༻༺ۣۣۖۖ༒ۣۣۖ༻༺ۣۣۖ༒ۣۣۖ
@compontents 未下载依赖的报错 因为在 components 文件下时没有 index.vue 的，所以就会认为 components 是 node_moudles 下的依赖(这种情况下不想引入每个组件，可以新建 index.js 进行统一导入)

报错 Unexpected side effect in "hasShowingChild" computed property vue/no-side-effects-in-computed-properties (hasShowingChild 判断有没有子菜单)
在计算属性中最好是只有纯计算，不要在计算属性中直接修改状态，而是将状态修改的逻辑放在方法或生命周期钩子中触发使用
watch 本身不会定义或创建属性或方法,它只是在某个属性发生变化时执行一个回调函数。
