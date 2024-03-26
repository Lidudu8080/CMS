const path = require('path')   //自带模块，直接引入使用

module.export = {
    outputDir: 'dist',
    assetsDir: 'assets',
    devServe: {
        host: '127.0.0.1',
        port: 3011,
        open: true,
    },
    //css自动化导入
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))

        // 设置别名
        config.resolve.alias.set('@', path.resolve(__dirname, ',./src'))
    },
}


function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/styles/mixin.less'),
            ],
        })
}