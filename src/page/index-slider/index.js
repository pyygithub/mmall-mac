/**
 * @Author:  pyy
 * @Description: 轮播图插件js
 * @Date:   2017/9/13 下午2:58
 * @Last Modified by:
 * @Last Modified time:  2017/9/13 下午2:58
 */

'use strict';

require('./index.css');
require('./unslider.js');
var tempateIndex = require('./index.string');
var _mm = require('util/mm.js');
var unslider = {
    option : {

    },
    init : function() {
        this.renderBanner()
    },
    // 渲染banner
    renderBanner : function(){
        // 计算active数据

        // 渲染banner数据
        var result = _mm.renderHtml(tempateIndex);
        // 把html放入容器
        $(".banner-con").html(result)

        // 初始化banner
        var $slider = $('.banner').unslider({
            dots: true,
        });

        // 为上一张 下一张绑定单击事件
        $('.banner').find('.arrow').click(function(){
            var forward = $(this).hasClass('prev') ? 'prev' : 'next';
            $slider.data('unslider')[forward]();
        });
    }
};

$(function(){
    //初始化首页banner
    unslider.init();
});