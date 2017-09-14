/*
* @Author: Rosen
* @Date:   2017-08-15 17:03:23
* @Last Modified by:   Rosen
* @Last Modified time: 2017-08-15 17:03:18
*/


var _mm = require('util/mm.js');

var _product = {
    // 用户登录
    login : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/login.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

}
module.exports = _product;