/**
 * @Author: wolf
 * @Date:	2017-08-06 17:30:57
 * @Last Modified by:	wolf
 * @Last Modified time:	2017-08-06 17:31:33
 */
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');

var _mm = require('util/mm.js');

// 初始化侧边栏导航
navSide.init({
	activeName : 'pass-update'
});
