/**
 * @Author: wolf
 * @Date:	2017-08-06 17:30:57
 * @Last Modified by:	wolf
 * @Last Modified time:	2017-08-06 17:31:33
 */

require('./index.css');

var _mm = require('util/mm.js');
//通用页面头部
var header = {
	// 初始化
	init : function(){
		this.bindEvent();
	},
	// 页面加载时完成数据回显
	onLoad : function(){
		// 获取地址参数中的keyword值
		var keyword = __mm.getUrlParam('keyword');
		//如果keyword存在，则回填搜索输入框
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	// 事件绑定
	bindEvent : function(){
		var _this = this;
		// 单击搜索按钮，执行搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		// 回车提交
		$('#search-input').keyup(function(e){
			// 13为回车键的键码值
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		});
		
	},
	// 搜索提交
	searchSubmit : function(){
		// 获取搜索框的值
		var keyword = $.trim($('#search-input').val());
		// 如果提交时有keyword，正常调转到list页面
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}
		// 如果keyword为空，直接回到首页
		else{
			_mm.goHome();
		}
	}
};

header.init();
