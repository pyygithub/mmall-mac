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
		// 验证用户名是否重复
		$('#username').blur(function(){
			var username = $.trim($(this).val());
			//用户名为空 不做验证
			if(!username){
				return;
			}
			//异步验证用户名是否存在
			_user.checkUsername(username,function(data,msg){
				formError.hide();
			},function(errMsg){
				formError.show(errMsg);
			});
		});
		
		//注册单击事件
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
			username 			: $.trim($('#username').val()),
			password 			: $.trim($('#password').val()),
			passwordConfirm 		: $.trim($('#password-confirm').val()),
			phone 				: $.trim($('#phone').val()),
			phoneCode 			: $.trim($('#phone-code').val()),
			email 				: $.trim($('#email').val()),
			question 			: $.trim($('#question').val()),
			answer				: $.trim($('#answer').val())
		}
		var validateResult = this.formValidate(formData);
		//验证成功
		if(validateResult.status){
			formError.hide();
			//提交注册
			_user.register(formData,function(res){
				window.location.href = './result.html?type=register';
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
		// 验证码用户名是否为空
		if(!_mm.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		// 验证码密码是否为空
		if(!_mm.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result;
		}
		// 验证密码长度是否合法
		if(formData.password.length < 6 || formData.password.length > 20){
			result.msg = '密码长度只能在6-20字符之间';
			return result;
		}
		// 确认密码
		if(!_mm.validate(formData.passwordConfirm,'require')){
			result.msg = '请输入确认密码';
			return result;
		}
		// 验证两次输入密码是否一致
		if(formData.password !== formData.passwordConfirm){
			result.msg = '两次输入密码不一致';
			return result;
		}
		//邮箱不能为空
		if(!_mm.validate(formData.email,'require')){
			result.msg = '邮箱不能为空';
			return result;
		}
		// 验证email
		if(!_mm.validate(formData.email,'email')){
			result.msg = '邮箱不合法';
			return result;
		}
		//手机号不能为空
		if(!_mm.validate(formData.phone,'require')){
			result.msg = '手机号不能为空';
			return result;
		}
		// 验证手机号
		if(!_mm.validate(formData.phone,'phone')){
			result.msg = '手机号不合法';
			return result;
		}

		//密码提示问题不能为空
		if(!_mm.validate(formData.question,'require')){
			result.msg = '密码提示问题不能为空';
			return result;
		}
		//密码提示问题答案不能为空
		if(!_mm.validate(formData.answer,'require')){
			result.msg = '密码提示问题答案不能为空';
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
