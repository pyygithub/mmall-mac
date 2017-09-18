 /**
 * @Author:  pyy
 * @Description: 商品列表页面js
 * @Date:   2017/9/13 下午5:59
 * @Last Modified by:
 * @Last Modified time:  2017/9/13 下午5:59
 */

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm             =   require('util/mm.js');
var _product        =   require('service/product-service.js');
var _cart           =   require('service/cart-service.js');
var templateIndex   =   require('./index.string');

var page = {
    data: {
        productId   : _mm.getUrlParam('productId') || '',
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        // 如果没有传递productId 直接回到首页
        if(!this.data.productId){
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent: function(){

    },
    // 加载商品详情数据
    loadDetail: function(){
        var html        = '',
            _this       = this,
            $pageWrap   = $('.page-wrap');

        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res);
            html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">此商品找不到了</p>')
        })

    },
    // 数据匹配
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};

$(function(){
    page.init();
});