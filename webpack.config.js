

var webpack 			= require('webpack');
var ExtractTextPlugin 	= require('extract-text-webpack-plugin');
var HtmlWebpackPlugin  	= require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};

var config = {
     entry: {
     	'common': ['./src/page/common/index.js'],
     	'index' : ['./src/page/index/index.js'],
     	'user-login' : ['./src/page/user-login/index.js'],
     	'user-register' : ['./src/page/user-register/index.js'],
     	'user-pass-reset' : ['./src/page/user-pass-reset/index.js'],
     	'result' : ['./src/page/result/index.js'],
     },
     output: {
        path: './dist',
        publicPath : '/dist',
        filename: 'js/[name].bundle.js'
     },
     externals : {
     	'jquery' : 'window.jQuery'
     },
     module: {
	    loaders:[
	      { 
	      	test: /\.css$/, 
	      	loader:  ExtractTextPlugin.extract("style-loader","css-loader")
	      },{ 
	       	test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
	       	loader: 'url-loader?limit=100&name=resource/[name].[ext]' 
	      },{ 
           	test: /\.string$/, 
           	loader: 'html-loader'
          }
	    ]
	 },
	 resolve : {
	 	alias : {
	 		node_modules 	: __dirname +　'/node_modules',
	 		util 			: __dirname +　'/src/util',
	 		page 			: __dirname + '/src/page',
	 		service 			: __dirname + '/src/service',
	 		img 				: __dirname + '/src/img',
	 	}
	 },
     plugins : [
     	//自动抽取公共组件到base.js中
     	new webpack.optimize.CommonsChunkPlugin({
     		//和上面entry中的名称一致，就会将对应js中的内容打包到base.js中,而不会生成common.bundle.js
     		name : 'common',
     		filename : 'js/base.js',
     	}),
     	//把css单独打包到文件中
     	new ExtractTextPlugin("css/[name].css"),
     	//html模板处理
     	new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
     	new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
     	new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
     	new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
     	new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
     ]
 };
 
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
//在linux命令行中输入：WEBPACK_ENV=dev webpack-dev-server --inline --port 8088
module.exports = config;