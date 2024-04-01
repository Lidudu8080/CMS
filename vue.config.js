const path = require("path"); //自带模块，直接引入使用  
  
module.exports = {  
  publicPath: "/cms-manage/",  
  outputDir: "dist",  
  assetsDir: "assets",  
  devServer: { // 注意这里是 Server 而不是 Serve  
    host: "127.0.0.1",  
    port: 3011,  
    open: true,  
    openPage: "cms-manage/",  
    proxy: {
      '/api/atlas-cms': {
        target: 'http://127.0.0.1:3300',
        pathRewrite: {
          '^/api/atlas-cms': '/atlas-cms'
        }
      }
      // '/api': {
      //   target: 'https://erp-newdev.fuchuang.com',
      //   headers: {
      //     host: 'erp-newdev.fuchuang.com'
      //   }
      // }
    }
  },  
  
  // css自动化导入  
  chainWebpack: (config) => {  
    const types = ["vue-modules", "vue", "normal-modules", "normal"];  
    types.forEach((type) => { // 加上花括号  
      addStyleResource(config.module.rule("less").oneOf(type));  
    });  
  
    // 设置别名  
    config.resolve.alias.set("@", path.resolve(__dirname, "./src")); // 去掉多余的逗号  
  },  
};  
  
function addStyleResource(rule) {  
  rule  
    .use("style-resource")  
    .loader("style-resources-loader")  
    .options({  
      patterns: [path.resolve(__dirname, "./src/styles/mixin.less")],  
    });  
}