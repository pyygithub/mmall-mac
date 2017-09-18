/*
* @Author: Rosen
* @Date:   2017-08-15 17:03:23
* @Last Modified by:   Rosen
* @Last Modified time: 2017-08-15 17:03:18
*/


var _mm = require('util/mm.js');

var _product = {
    // 获取商品列表
    getProductList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },

}
module.exports = _product;