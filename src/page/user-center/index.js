/**
 * @Author: wolf
 * @Date:	2017-08-06 17:30:57
 * @Last Modified by:	wolf
 * @Last Modified time:	2017-08-06 17:31:33
 */
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var navSide 			= require('page/common/nav-side/index.js');
var _mm 				= require('util/mm.js');
var _user 			= require('service/user-service.js');
var tempateIndex	 	= require('./index.string');

var page = {
	init : function(){
		this.onLoad();
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			activeName: 'user-center'
		});
		//加载个人信息
		this.loadUserInfo();
	},
	//加载个人信息
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(tempateIndex,res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	}
};

$(function(){
	page.init();
});