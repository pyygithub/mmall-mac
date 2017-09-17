/**
 * @Author:  pyy
 * @Description: webpack配置文件
 * @Date:   2017/9/14 下午11:13
 * @Last Modified by:
 * @Last Modified time:  2017/9/14 下午11:13
 */

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function (name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
};

var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'list': ['./src/page/list/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'result': ['./src/page/result/index.js'],
    },
    output: {
        path: './dist',					// 用来存放打包后文件的输出目录
        publicPath: '/dist',			// 指定资源文件引用的目录
        filename: 'js/[name].bundle.js'	// 打包文件名称
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            {
                // 原始加载方式：require('./index.css'); 从右向左依次指定：css-loader style-loader
                test: /\.css$/, // 正则匹配*.css结尾文件
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")// 将css成生文件，而非内联，ExtractTextPlugin
            },
            {
                /**
                 *  在css中或者js逻辑中，都会涉及到require图片的情况，webpack可以内联图片地址打包js中并且通过require()返回图片路径。当然，不只是图片，还有css中用到的iconfont，特殊情况用到的flash等，都可以相似处理。
                 *  这里，我们需要用到url-loader 或 file-loader。
                 * 1、针对大的图片使用file-loader :将匹配到的文件复制到输出文件夹，并根据output.publicPath的设置返回文件路径
                 * 2、使用url-loader使用base64编码(不用发送额外的http请求，主要针对小icon图标):类似file-loader ,但是它可以返回一个DataUrl (base 64)如果文件小于设置的限制值limit。
                 */

                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192&name=resource/[name].[ext]' //<= 8kb的图片base64内联
                //过向url-loader传递参数，如果图片小于8kb，则base64内联，大于8kb，则通过output.publishPath配置的前缀将图片路径写入代码，并提取图片到输出目录。
            },
            {
                test: /\.string$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            img: __dirname + '/src/img',
        }
    },
    plugins: [
        // 压缩
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         //不显示警告
        //         warnings: false
        //     },
        // }),
        // 多个 html共用一个js文件(chunk)，可用CommonsChunkPlugin
        new webpack.optimize.CommonsChunkPlugin({
            //和上面entry中的名称一致，就会将对应js中的内容打包到base.js中,而不会生成common.bundle.js
            name: 'common',
            filename: 'js/base.js',
        }),
        //把css单独打包到文件中
        new ExtractTextPlugin("css/[name].css"),
        //html模板处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    ]
};

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
//在linux命令行中输入：WEBPACK_ENV=dev webpack-dev-server --inline --port 8088
module.exports = config;