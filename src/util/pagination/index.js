/**
 * @Author:  pyy
 * @Description: 分页工具类
 * @Date:   2017/9/18 上午12:34
 * @Last Modified by:
 * @Last Modified time:  2017/9/18 上午12:34
 */

'use strict';

require('./index.css');

var templatePagination = require('./index.string');
var _mm = require('util/mm.js');

var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        pageRange       : 3,
        onSelectPage    : null
    };

    // 事件的处理:代理绑定事件（解决后渲染数据事件绑定问题）
    $(document).on('click', '.pg-item', function(){
        var $this = $(this);
        // 对象active 和 disabled按钮的单击不做处理
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : '';
    });
}

// 渲染分页组件
Pagination.prototype.render = function(userOption){
    // 合并option
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否为合法的jQuery对象
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    // 判断是否只有1页
    if(this.option.pages <= 1){
        return;
    }
    // 渲染分页
    this.option.container.html(this.getPaginationHtml());
}

// 获取分页的html  上一页 1 2 3 4 5 6 7 下一页 5/6
Pagination.prototype.getPaginationHtml = function(){
    var html        = '',
        option      = this.option,
        start       = (option.pageNum - option.pageRange > 0) ? (option.pageNum - option.pageRange) : 1,
        end         = (option.pageNum + option.pageRange > option.pages) ? option.pages :  (option.pageNum + option.pageRange),
        pageArray   = [];

    // 上一页
    pageArray.push({
        name        : '上一页',
        value       : option.prePage,
        disabled    : !option.hasPreviousPage
    });
    // 数字按钮处理
    for(var i = start ; i <= end ; i++){
        pageArray.push({
            name    : i,
            value   : i,
            active  : (i === option.pageNum)
        });
    }
    // 下一页
    pageArray.push({
        name        : '下一页',
        value       : option.nextPage,
        disabled    : !option.hasNextPage
    });



    html = _mm.renderHtml(templatePagination, {
        pageArray   : pageArray,
        pageNum     : option.pageNum,
        pages       : option.pages
    });

    return html;
}

module.exports = Pagination;