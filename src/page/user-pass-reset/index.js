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
	// 暂存数据对象
	data : {
		username : '',
		question : '',
		answer	 : '',
		token 	 : ''
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		//显示第一步
		this.loadFirstStep();
	},
	bindEvent : function(){
		var _this = this;
		// 单击填写用户名：下一步
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			// 如果用户名存在
			if(username){
				// 调用业务层方法：根据用户名获取用户密码提示问题
				_user.getQuestion(username,function(res){
					_this.data.username = username;
					_this.data.question = res;
					//执行下一步：输入密码提示问题答案
					_this.loadSecondStep();
				},function(errMsg){
					formError.show(errMsg);
				});
			}// 用户名不存在
			else{
				formError.show("请输入用户名");
			}
		});
		// 单击填写密码提示问题答案：下一步
		$('#submit-answer').click(function(){
			var answer = $.trim($('#answer').val());
			// 如果提示答案不为空
			if(answer){
				// 调用业务层方法：判断答案是否正确
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer	 : answer
				},function(res){
					_this.data.answer = answer;
					_this.data.token = res;
					// 执行下一步：填写新密码
					_this.loadThirdStep();
				},function(errMsg){
					formError.show(errMsg);
				});
			}// 用户名不存在
			else{
				formError.show("请输入密码提示问题答案");
			}
		});
		// 单击修改密码：下一步
		$('#submit-new-password').click(function(){
			// 获取新密码
			var newPassword = $.trim($('#new-password').val());
			// 如果新密码不为空
			if(newPassword && newPassword.length >= 6 && newPassword.length <= 12){
				// 获取确认新密码
				var newPasswordConfirm = $.trim($('#new-password-confirm').val());
				if(newPasswordConfirm){
					if(newPasswordConfirm === newPassword){
						// 调用业务层方法：判断答案是否正确
						_user.resetPassword({
							username 	: _this.data.username,
							newPassword : newPassword,
							forgetToken	: _this.data.token
						},function(res){
							// 执行下一步：完成
							_this.loadFinishStep();
						},function(errMsg){
							formError.show(errMsg);
						});
					}
					// 两次密码不一致
					else{
						formError.show("两次密码不一致");
					}
				}
				//确认密码不能为空
				else{
					formError.show("请输入确认密码");
				}
				
			}// 用户名不存在
			else{
				formError.show("请输入6-12位密码");
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
	//第一步:填写用户名
	loadFirstStep : function(){
		$(".step-username").show();
	},
	//第二步:填写密码提示问题答案
	loadSecondStep : function(){
		var _this = this;
		//隐藏提示信息
		formError.hide();
		// 隐藏第一步内容
		$(".step-username").hide();
		//切换问题标题条活动样式
		$('.second-step').addClass('active');
		// 显示第二步内容
		$(".step-answer").show().find('.question').text(_this.data.question); 
	},
	//第三步:填写用户名
	loadThirdStep : function(){
		var _this = this;
		//隐藏提示信息
		formError.hide();
		// 隐藏第二步内容
		$(".step-answer").hide();
		//切换问题标题条活动样式
		$('.step-answer').addClass('active');
		// 显示第三步内容
		$(".step-new-password").show();
	},
	//最后一步:完成
	loadFinishStep : function(){
		var _this = this;
		//隐藏提示信息
		formError.hide();
		// 隐藏第三步内容
		$(".step-new-password").hide();
		//切换问题标题条活动样式
		$('.step-finish').addClass('active');
		// 显示第四步内容
		$(".step-finish").show();
	},
};

$(function(){
	page.init();
});
