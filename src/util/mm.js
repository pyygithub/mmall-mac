var Hogan = require('hogan');
//服务器参数配置
var conf = {
	serverHost : ''
};
var _mm = {
	// 发送网络请求
	request : function(param){
		var _this = this;
		$.ajax({
			type			: param.method	|| 'get',
			url				: param.url 	|| '',
			dataType		: param.type	|| 'json',
			data			: param.data 	|| '',
			success		: function(res){
				//请求成功
				if(0 === res.status){
					typeof param.success == 'function' && param.success(res.data, res.msg);
				}
				// 没有登录状态，需要强制登录
				else if(10 === res.status){
					_this.doLogin();
				}
				// 请求数据错误
				else if(1 === res.status){
					typeof param.error == 'function' && param.error(res.msg);
				}
			},
			error		: function(err){
				typeof param.error == 'function' && param.error(err.msg);
			}
		});
	},
	// 获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	// 获取url参数
	getUrlParam : function(name){
		var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
	},
	// 渲染html模板:Hogan
	renderHtml : function(htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate);
		var result = template.render(data);
		return result;
	},
	// 成功提示
	successTips : function(msg){
		alert(msg || '操作成功！');
	},
	// 错误提示
	errorTips : function(msg){
		alert(msg || '系统错误！');
	},
	// 字段验证，支持是否非空判断、手机、邮箱
	validate : function(value,type){
		var value = $.trim(value);
		// 非空验证
		if('require' === type){
			return !!value;
		}
		// 手机号验证
		if('phone' === type){
			/**
			 * 移动号码段:139、138、137、136、135、134、150、151、152、157、158、159、182、183、187、188、147
			 * 联通号码段:130、131、132、136、185、186、145
			 * 电信号码段:133、153、180、189
			 */
			return /^1(3|4|5|7|8)\d{9}$/.test(value);
		}
		// 邮箱格式验证
		if('email' === type){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	// 统一登录处理
	doLogin : function(){
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	// 统一调整到首页
	goHome : function(){
		window.location.href='./index.html';
	}
};

module.exports = _mm;
