// vue.config.js
var path = require("path")

const port = 8080

module.exports = {
    // devServer: {
    // port,
    // proxy: {
    // change xxx-api/login => mock/login
    // detail: https://cli.vuejs.org/config/#devserver-proxy
    // ['/api']: {
    //     target: `http://localhost:${port}/mock`,
    //     changeOrigin: true,
    //         ['^' + "/api"]: ''
    //     pathRewrite: {
    //     }
    // }
    // },
    // after(app) {
    //     const baseConfig = require('./babel.config')
    //     require('babel-register')({
    //         presets: ['es2015']
    //     });
    //     const bodyParser = require('body-parser')

    //     // parse app.body
    //     // http://expressjs.com/en/4x/api.html#req.body
    //     app.use(bodyParser.json())
    //     app.use(bodyParser.urlencoded({
    //         extended: true
    //     }))

    //     const { default: mocks } = require('./mock')
    //     for (const mock of mocks) {
    //         app[mock.type](mock.url, mock.response)
    //     }
    // }
    // },
    chainWebpack: config => {
        //配置 alias 
        config.resolve.alias.set("~", path.resolve(__dirname, './public'))
        //处理 前端资源的image 都转base64  file-loader  
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10240 }))

        // html plugin 
        config.plugin('html')
            .tap(args => {
                args[0].minify = {
                    removeAttributeQuotes: false // 移除属性的引号
                }
                return args
            })
    }
}