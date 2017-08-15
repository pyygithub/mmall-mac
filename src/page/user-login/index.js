/**
 * @Author: wolf
 * @Date:	2017-08-06 17:30:57
 * @Last Modified by:	wolf
 * @Last Modified time:	2017-08-06 17:31:33
 */

require('./index.css');
require('page/common/nav-simple/index.js');//引入nav-simple样式

var _mm 		= require('util/mm.js');
var _user 	= require('service/user-service.js');

//表单错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.error-msg').text(errMsg);
	},
	hide :function(){
		$('.error-item').hide().find('.error-msg').text('');
	}
};

var page = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//登录单击事件
		$('#submit').click(function(){
			_this.submit();
		});
		//回车提交
		$('.user-content').keyup(function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		});
	},
	//提交表单
	submit : function(){
		var formData = {
			username : $.trim($('#username').val()),
			password : $.trim($('#password').val())
		}
		var validateResult = this.formValidate(formData);
		//验证成功
		if(validateResult.status){
			formError.hide();
			_user.login(formData,function(res){
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			},function(errMsg){
				formError.show(errMsg);
			});
		}
		//验证失败
		else{
			formError.show(validateResult.msg);
		}
	},
	// 表单字段验证
	formValidate : function(formData){
		var result = {
			status  : false,
			msg 		: '',
		}
		if(!_mm.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		if(!_mm.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result;
		}
		//通过验证，返回正确提示
		result.status  = true;
		result.msg	   = '验证通过';
		
		return result;
	}
};

$(function(){
	page.init();
});
