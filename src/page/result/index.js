/**
 * @Author: wolf
 * @Date:	2017-08-06 17:30:57
 * @Last Modified by:	wolf
 * @Last Modified time:	2017-08-06 17:31:33
 */

require('./index.css');
require('page/common/nav-simple/index.js');//引入nav-simple样式

var _mm = require('util/mm.js');

//通用页面头部
var result = {
	// 初始化
	init : function(){
		// 根据不同的类型显示不同的成功提示
		var type = _mm.getUrlParam('type') || 'default';
		var $element = $('.'+type+'-success');
		$element.show();
	}
}

$(function(){
	result.init();
});

